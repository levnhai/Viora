import {
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Otp, OtpDocument } from './schemas/otp.schema';
import * as crypto from 'crypto';
import * as nodemailer from 'nodemailer';
import { OAuth2Client } from 'google-auth-library';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Otp.name)
    private readonly otpModel: Model<OtpDocument>,
    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    // Seed default users if collection is empty
    const count = await this.userModel.countDocuments().exec();
    if (count === 0) {
      console.log('--- Seeding default users (admin, staff & users) ---');

      // Admin
      await this.createUser('admin', 'admin123', 'admin');

      // Staff
      await this.createUser('staff', 'staff123', 'staff');

      // Users linked to their seeded weddings
      await this.createUser('minh-lan', '123456', 'user', 'minh-lan');
      await this.createUser('vanan', '123456', 'user', 'vanan-thibinh');
      await this.createUser('hoang-yen', '123456', 'user', 'hoang-yen');

      console.log('--- Seeding default users completed! ---');
    }
  }

  hashPassword(password: string): string {
    return crypto.createHash('sha256').update(password).digest('hex');
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
    const passwordHash = this.hashPassword(passwordPlain);
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
    const secret =
      this.configService.get<string>('JWT_SECRET') ||
      'viora_wedding_secret_key';

    // Create token payload
    const payload = {
      id: user._id,
      username: user.username,
      role: user.role,
      weddingSlug: user.weddingSlug,
    };

    // Encrypt token
    const data = Buffer.from(JSON.stringify(payload)).toString('base64');
    const signature = crypto
      .createHmac('sha256', secret)
      .update(data)
      .digest('base64');

    const token = `${data}.${signature}`;

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
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    const hash = this.hashPassword(passwordPlain);
    if (user.passwordHash !== hash) {
      throw new UnauthorizedException('Mật khẩu không chính xác!');
    }

    const tokenData = this.generateToken(user);
    const displayName = username.split('@')[0];
    return {
      ...tokenData,
      name: user.fullName || displayName,
      email: user.email || (username.includes('@') ? username : undefined),
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
      existingUser.passwordHash = this.hashPassword(passwordPlain);
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
      throw new UnauthorizedException('Mã xác thực đã hết hạn hoặc không tồn tại!');
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
        console.log(`[SMTP] Đã gửi mã OTP quên mật khẩu (${otpCode}) thành công tới: ${email}`);
      } catch (error) {
        console.error('[SMTP Error] Gửi mail khôi phục mật khẩu thất bại:', error);
      }
    } else {
      console.log(`[SMTP Config Missing] Chưa cấu hình SMTP. Mã OTP quên mật khẩu của ${email} là: ${otpCode}`);
    }
  }

  async forgotPassword(email: string): Promise<{ success: boolean; message: string }> {
    const user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      throw new UnauthorizedException('Địa chỉ Email không tồn tại trong hệ thống!');
    }

    const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
    await this.otpModel.findOneAndUpdate(
      { email },
      { code: otpCode, createdAt: new Date() },
      { upsert: true, new: true },
    ).exec();

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
      throw new UnauthorizedException('Mã xác thực đã hết hạn hoặc không tồn tại!');
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
      throw new UnauthorizedException('Mã xác thực đã hết hạn hoặc không tồn tại!');
    }

    if (otpRecord.code !== code) {
      throw new UnauthorizedException('Mã xác thực không chính xác!');
    }

    const user = await this.userModel.findOne({ username: email }).exec();
    if (!user) {
      throw new UnauthorizedException('Tài khoản không tồn tại!');
    }

    // Cập nhật mật khẩu mới
    user.passwordHash = this.hashPassword(passwordNew);
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
        { upsert: true, new: true },
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
        console.log(
          `[SMTP] Đã gửi mã OTP (${otpCode}) thành công tới: ${email}`,
        );
        return {
          success: true,
          message: 'Mã xác thực đã được gửi tới email của bạn!',
        };
      } catch (error) {
        console.error('[SMTP Error] Gửi mail thất bại:', error);
        console.log(`[FALLBACK] Mã OTP của email ${email} là: ${otpCode}`);
        return {
          success: true,
          message: `Gửi mail lỗi nhưng hệ thống dự phòng đã kích hoạt. Mã OTP: ${otpCode}`,
        };
      }
    } else {
      console.log(
        `[SMTP Config Missing] Chưa cấu hình SMTP. Mã OTP của email ${email} là: ${otpCode}`,
      );
      return {
        success: true,
        message: `Chưa cấu hình SMTP. OTP (in ra console backend): ${otpCode}`,
      };
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
}
