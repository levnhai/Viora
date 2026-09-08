import {
  Injectable,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Otp, OtpDocument } from './schemas/otp.schema';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import * as bcrypt from 'bcryptjs';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Otp.name)
    private readonly otpModel: Model<OtpDocument>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  }

  async verifyPassword(password: string, storedHash: string): Promise<boolean> {
    if (!storedHash) return false;

    // Nếu là chuỗi hash bcrypt ($2a$, $2b$, $2y$)
    if (
      storedHash.startsWith('$2a$') ||
      storedHash.startsWith('$2b$') ||
      storedHash.startsWith('$2y$')
    ) {
      return bcrypt.compare(password, storedHash);
    }

    // Tương thích ngược: kiểm tra hash SHA-256 cũ
    try {
      const expected = crypto
        .createHash('sha256')
        .update(password)
        .digest('hex');
      if (Buffer.byteLength(storedHash) !== Buffer.byteLength(expected)) {
        return false;
      }
      return crypto.timingSafeEqual(
        Buffer.from(storedHash),
        Buffer.from(expected),
      );
    } catch {
      return false;
    }
  }

  async createUser(
    username: string,
    passwordPlain: string,
    role: string,
    weddingSlug?: string,
    fullName?: string,
    phone?: string,
    status = 'active',
  ): Promise<User> {
    const passwordHash = await this.hashPassword(passwordPlain);
    const displayName = fullName || username.split('@')[0];
    const emailValue = username.includes('@') ? username : '';

    // Determine default account type based on role
    let defaultAccountType = 'customer';
    if (role === 'admin') defaultAccountType = 'admin';
    if (role === 'staff') defaultAccountType = 'affiliate';

    const user = new this.userModel({
      username,
      passwordHash,
      role,
      weddingSlug,
      fullName: displayName,
      phone: phone || '',
      email: emailValue,
      accountType: defaultAccountType,
      status,
    });
    return user.save();
  }

  generateToken(user: any): {
    token: string;
    role: string;
    weddingSlug?: string;
  } {
    const payload = {
      id: user._id?.toString() || user.id,
      username: user.username,
      role: user.role,
      weddingSlug: user.weddingSlug,
    };

    const token = this.jwtService.sign(payload);
    return {
      token,
      role: user.role,
      weddingSlug: user.weddingSlug,
    };
  }

  async login(
    username: string,
    passwordPlain: string,
  ): Promise<{
    token: string;
    role: string;
    weddingSlug?: string;
    name?: string;
    email?: string;
  }> {
    const trimmed = (username || '').trim();
    const user = await this.userModel
      .findOne({
        $or: [
          { username: trimmed },
          { email: trimmed },
          { username: { $regex: new RegExp(`^${trimmed}$`, 'i') } },
          { email: { $regex: new RegExp(`^${trimmed}$`, 'i') } },
          ...(trimmed.toLowerCase() === 'admin'
            ? [{ username: 'admin@viora.vn' }, { role: 'admin' }]
            : []),
        ],
      })
      .exec();

    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }
    if (user.status !== 'active') {
      throw new UnauthorizedException(
        'Tài khoản chưa được kích hoạt hoặc đã bị khóa',
      );
    }

    if (!(await this.verifyPassword(passwordPlain, user.passwordHash))) {
      user.failedLoginAttempts = (user.failedLoginAttempts || 0) + 1;
      if (user.failedLoginAttempts >= 5) user.status = 'blocked';
      await user.save();
      throw new UnauthorizedException(
        user.status === 'blocked'
          ? 'Tài khoản đã bị khóa do đăng nhập sai 5 lần'
          : 'Mật khẩu không chính xác!',
      );
    }

    // Tự động nâng cấp mật khẩu từ SHA-256 cũ sang bcrypt
    if (
      !user.passwordHash.startsWith('$2a$') &&
      !user.passwordHash.startsWith('$2b$')
    ) {
      user.passwordHash = await this.hashPassword(passwordPlain);
    }

    user.failedLoginAttempts = 0;
    user.lastLoginAt = new Date();
    await user.save();
    const tokenData = this.generateToken(user);
    const displayName = (user.fullName || user.username || '').split('@')[0];
    return {
      ...tokenData,
      name: user.fullName || displayName,
      email:
        user.email ||
        (user.username && user.username.includes('@')
          ? user.username
          : undefined),
    };
  }

  async register(
    username: string,
    passwordPlain: string,
    fullName?: string,
    phone?: string,
  ): Promise<{ success: boolean; message: string }> {
    const existingUser = await this.userModel.findOne({ username }).exec();
    if (existingUser) {
      if (existingUser.status === 'active') {
        throw new UnauthorizedException('Tên đăng nhập đã tồn tại!');
      }
      // Nếu chưa kích hoạt, cho phép cập nhật thông tin mới
      existingUser.passwordHash = await this.hashPassword(passwordPlain);
      existingUser.fullName = fullName || existingUser.fullName;
      existingUser.phone = phone || existingUser.phone;
      await existingUser.save();
    } else {
      await this.createUser(
        username,
        passwordPlain,
        'user',
        undefined,
        fullName,
        phone,
        'pending_verification',
      );
    }
    return this.sendOtp(username);
  }

  async registerVerifyOtp(
    email: string,
    code: string,
  ): Promise<{
    token: string;
    role: string;
    weddingSlug?: string;
    name?: string;
    email?: string;
  }> {
    const otpRecord = await this.otpModel.findOne({ email }).exec();
    if (!otpRecord) {
      throw new UnauthorizedException(
        'Mã xác thực đã hết hạn hoặc không tồn tại!',
      );
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Mã xác thực không chính xác!');
    }

    // Xóa mã OTP sau khi xác thực thành công
    await this.otpModel.deleteOne({ email }).exec();

    const user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    user.status = 'active';
    await user.save();

    const tokenData = this.generateToken(user);
    return {
      ...tokenData,
      name: user.fullName,
      email: user.email,
    };
  }

  async sendForgotPasswordOtp(email: string, otpCode: string) {
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT');
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPass = this.configService.get<string>('SMTP_PASS');

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Viora Wedding" <${smtpUser}>`,
          to: email,
          subject: 'Mã khôi phục mật khẩu - Viora Wedding',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333333;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #db2777; margin: 0;">Viora Wedding</h2>
                <p style="font-size: 14px; color: #777777; margin: 5px 0 0 0;">Nền tảng thiệp cưới trực tuyến sang trọng</p>
              </div>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin-bottom: 20px;" />
              <p style="font-size: 16px; line-height: 1.5;">Chào bạn,</p>
              <p style="font-size: 16px; line-height: 1.5;">Bạn vừa yêu cầu mã khôi phục mật khẩu cho tài khoản tại <strong>Viora Wedding</strong>.</p>
              <div style="text-align: center; margin: 30px 0; padding: 15px; background-color: #fdf2f8; border-radius: 5px; font-weight: bold; font-size: 28px; letter-spacing: 5px; color: #db2777; border: 1px dashed #f472b6;">
                ${otpCode}
              </div>
              <p style="font-size: 14px; color: #ff5722; font-style: italic; line-height: 1.5;">Lưu ý: Mã xác thực này có hiệu lực trong vòng 5 phút và chỉ sử dụng một lần. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">
                Email này được gửi tự động từ hệ thống Viora Wedding. Vui lòng không phản hồi email này.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(
          `[SMTP] Đã gửi mã OTP quên mật khẩu thành công tới: ${email}`,
        );
      } catch (error) {
        console.error(
          '[SMTP Error] Gửi mail khôi phục mật khẩu thất bại:',
          error,
        );
        if (process.env.NODE_ENV !== 'production') {
          console.warn(
            `[DEV ONLY] Mã OTP quên mật khẩu của ${email} là: ${otpCode}`,
          );
        } else {
          throw new InternalServerErrorException(
            'Không thể gửi mã khôi phục mật khẩu qua email. Vui lòng thử lại sau.',
          );
        }
      }
    } else {
      console.warn('[SMTP Config Missing] Chưa cấu hình SMTP.');
      if (process.env.NODE_ENV !== 'production') {
        console.warn(
          `[DEV ONLY] Mã OTP quên mật khẩu của ${email} là: ${otpCode}`,
        );
      } else {
        throw new InternalServerErrorException(
          'Hệ thống gửi email chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
        );
      }
    }
  }

  async forgotPassword(
    email: string,
  ): Promise<{ success: boolean; message: string }> {
    const user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      throw new UnauthorizedException(
        'Địa chỉ Email không tồn tại trong hệ thống!',
      );
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.otpModel
      .findOneAndUpdate(
        { email },
        { code: otpCode, createdAt: new Date() },
        { upsert: true, returnDocument: 'after' },
      )
      .exec();

    await this.sendForgotPasswordOtp(email, otpCode);

    return {
      success: true,
      message: 'Mã OTP khôi phục mật khẩu đã được gửi tới Email của bạn!',
    };
  }

  async verifyForgotPasswordOtp(
    email: string,
    code: string,
  ): Promise<{ success: boolean; message: string }> {
    const otpRecord = await this.otpModel.findOne({ email }).exec();
    if (!otpRecord) {
      throw new UnauthorizedException(
        'Mã xác thực đã hết hạn hoặc không tồn tại!',
      );
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Mã xác thực không chính xác!');
    }

    return {
      success: true,
      message: 'Mã xác thực OTP chính xác!',
    };
  }

  async resetPassword(
    email: string,
    code: string,
    passwordNew: string,
  ): Promise<{ success: boolean; message: string }> {
    const otpRecord = await this.otpModel.findOne({ email }).exec();
    if (!otpRecord) {
      throw new UnauthorizedException(
        'Mã xác thực đã hết hạn hoặc không tồn tại!',
      );
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Mã xác thực không chính xác!');
    }

    const user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    // Cập nhật mật khẩu mới
    user.passwordHash = await this.hashPassword(passwordNew);
    await user.save();

    // Xóa mã OTP sau khi đổi mật khẩu thành công
    await this.otpModel.deleteOne({ email }).exec();

    return {
      success: true,
      message: 'Mật khẩu đã được thay đổi thành công!',
    };
  }

  async sendOtp(email: string): Promise<{ success: boolean; message: string }> {
    // Generate a random 6-digit OTP
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Save or update OTP record in database
    await this.otpModel
      .findOneAndUpdate(
        { email },
        { code: otpCode, createdAt: new Date() },
        { upsert: true, returnDocument: 'after' },
      )
      .exec();

    // Read SMTP config
    const smtpHost = this.configService.get<string>('SMTP_HOST');
    const smtpPort = this.configService.get<number>('SMTP_PORT');
    const smtpUser = this.configService.get<string>('SMTP_USER');
    const smtpPass = this.configService.get<string>('SMTP_PASS');

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number(smtpPort),
          secure: Number(smtpPort) === 465,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        });

        const mailOptions = {
          from: `"Viora Wedding" <${smtpUser}>`,
          to: email,
          subject: 'Mã xác thực đăng nhập - Viora Wedding',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px; background-color: #ffffff; color: #333333;">
              <div style="text-align: center; margin-bottom: 20px;">
                <h2 style="color: #6a1b9a; margin: 0;">Viora Wedding</h2>
                <p style="font-size: 14px; color: #777777; margin: 5px 0 0 0;">Nền tảng thiệp cưới trực tuyến sang trọng</p>
              </div>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin-bottom: 20px;" />
              <p style="font-size: 16px; line-height: 1.5;">Chào bạn,</p>
              <p style="font-size: 16px; line-height: 1.5;">Bạn vừa yêu cầu mã xác thực để đăng nhập vào hệ thống <strong>Viora Wedding</strong>.</p>
              <div style="text-align: center; margin: 30px 0; padding: 15px; background-color: #f3e5f5; border-radius: 5px; font-weight: bold; font-size: 28px; letter-spacing: 5px; color: #6a1b9a; border: 1px dashed #ab47bc;">
                ${otpCode}
              </div>
              <p style="font-size: 14px; color: #ff5722; font-style: italic; line-height: 1.5;">Lưu ý: Mã xác thực này có hiệu lực trong vòng 5 phút và chỉ sử dụng một lần. Vui lòng không chia sẻ mã này với bất kỳ ai.</p>
              <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;" />
              <p style="font-size: 12px; color: #999999; text-align: center; margin: 0;">
                Email này được gửi tự động từ hệ thống Viora Wedding. Vui lòng không phản hồi email này.
              </p>
            </div>
          `,
        };

        await transporter.sendMail(mailOptions);
        console.log(`[SMTP] Đã gửi mã OTP thành công tới: ${email}`);
        return {
          success: true,
          message: 'Mã xác thực đã được gửi tới email của bạn!',
        };
      } catch (error) {
        console.error('[SMTP Error] Gửi mail thất bại:', error);
        if (process.env.NODE_ENV !== 'production') {
          console.warn(`[DEV ONLY] Mã OTP của email ${email} là: ${otpCode}`);
          return {
            success: true,
            message:
              'Gửi mail thất bại (xem mã OTP tại console server trong môi trường dev).',
          };
        }
        throw new InternalServerErrorException(
          'Không thể gửi mã xác thực qua email. Vui lòng thử lại sau hoặc liên hệ hỗ trợ.',
        );
      }
    } else {
      console.warn('[SMTP Config Missing] Chưa cấu hình SMTP.');
      if (process.env.NODE_ENV !== 'production') {
        console.warn(`[DEV ONLY] Mã OTP của email ${email} là: ${otpCode}`);
        return {
          success: true,
          message:
            'Hệ thống dev chưa cấu hình SMTP (xem mã OTP tại console server).',
        };
      }
      throw new InternalServerErrorException(
        'Hệ thống gửi email chưa được cấu hình. Vui lòng liên hệ quản trị viên.',
      );
    }
  }

  async verifyOtp(
    email: string,
    code: string,
  ): Promise<{
    token: string;
    role: string;
    weddingSlug?: string;
    name?: string;
    email?: string;
  }> {
    const otpRecord = await this.otpModel.findOne({ email }).exec();
    if (!otpRecord) {
      throw new UnauthorizedException(
        'Mã xác thực đã hết hạn hoặc không tồn tại!',
      );
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Mã xác thực không chính xác!');
    }

    // Delete OTP record after successful verification
    await this.otpModel.deleteOne({ email }).exec();

    // Check if user exists
    let user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      // Auto-register user with random password
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = (await this.createUser(email, randomPassword, 'user')) as any;
      console.log(
        `[OTP Register] Đã tự động tạo tài khoản mới cho email: ${email}`,
      );
    }

    const tokenData = this.generateToken(user);
    const displayName = email.split('@')[0];
    return {
      ...tokenData,
      name: user?.fullName || displayName,
      email,
    };
  }

  async googleLogin(token: string): Promise<{
    token: string;
    role: string;
    weddingSlug?: string;
    name?: string;
    picture?: string;
    email?: string;
  }> {
    if (!token) {
      throw new UnauthorizedException('Thiếu token xác thực từ Google!');
    }

    const googleClientId = this.configService.get<string>('GOOGLE_CLIENT_ID');
    if (!googleClientId) {
      throw new UnauthorizedException(
        'Chưa cấu hình GOOGLE_CLIENT_ID trên server!',
      );
    }

    const client = new OAuth2Client(googleClientId);
    let email: string | undefined;
    let name: string | undefined;
    let picture: string | undefined;

    // Check if token is access token or ID token (JWT always has exactly 2 dots separating 3 segments)
    const isAccessToken =
      token.startsWith('ya29.') || (token.match(/\./g) || []).length !== 2;

    try {
      if (isAccessToken) {
        client.setCredentials({ access_token: token });
        const response = await client.request<{
          email?: string;
          name?: string;
          picture?: string;
        }>({
          url: 'https://www.googleapis.com/oauth2/v3/userinfo',
        });
        email = response.data.email;
        name = response.data.name;
        picture = response.data.picture;
      } else {
        const ticket = await client.verifyIdToken({
          idToken: token,
          audience: googleClientId,
        });
        const payload = ticket.getPayload();
        email = payload?.email;
        name = payload?.name;
        picture = payload?.picture;
      }
    } catch (error: any) {
      console.error('[Google OAuth Error]:', error.message || error);
      throw new UnauthorizedException(
        `Xác thực tài khoản Google thất bại! Chi tiết: ${error.message || error}`,
      );
    }

    if (!email) {
      throw new UnauthorizedException(
        'Không thể lấy email từ tài khoản Google!',
      );
    }

    // Find or create user
    let user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      const randomPassword = crypto.randomBytes(16).toString('hex');
      user = (await this.createUser(email, randomPassword, 'user')) as any;
      console.log(
        `[Google Register] Đã tự động tạo tài khoản mới cho Google User: ${email}`,
      );
    }

    const tokenData = this.generateToken(user);
    return {
      ...tokenData,
      name: user?.fullName || name,
      picture,
      email,
    };
  }
  async changeAdminCredentials(
    userId: string,
    currentPassword: string,
    newEmail: string,
    newPassword: string,
  ) {
    const user = await this.userModel.findById(userId).exec();
    if (!user || !['admin', 'staff'].includes(user.role))
      throw new UnauthorizedException('Tài khoản không hợp lệ');
    if (!(await this.verifyPassword(currentPassword, user.passwordHash)))
      throw new UnauthorizedException('Mật khẩu hiện tại không đúng');
    const email = newEmail.trim().toLowerCase();
    const existing = await this.userModel
      .findOne({ email, _id: { $ne: user._id } })
      .exec();
    if (existing) throw new UnauthorizedException('Email này đã được sử dụng');
    user.email = email;
    user.username = email;
    user.passwordHash = await this.hashPassword(newPassword);
    await user.save();
    return this.generateToken(user);
  }
}
