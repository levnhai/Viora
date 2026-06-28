import { API_URL } from "@/shared/lib/config";

export const authService = {
  // 1. Đăng nhập bằng Email & Mật khẩu
  async login(email: string, passwordPlain: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: email, password: passwordPlain }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đăng nhập thất bại!");
    }
    return resData.data; // Trả về: { role, weddingSlug, name, email }
  },

  // 2. Đăng ký tài khoản mới (Gửi mã OTP về email)
  async register(email: string, passwordPlain: string, fullName: string, phone?: string) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: email, password: passwordPlain, fullName, phone }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đăng ký tài khoản thất bại!");
    }
    return resData;
  },

  // 3. Xác thực mã OTP kích hoạt tài khoản đăng ký
  async registerVerifyOtp(email: string, code: string) {
    const response = await fetch(`${API_URL}/api/auth/register-verify-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Mã xác thực không chính xác hoặc đã hết hạn!");
    }
    return resData.data; // Trả về: { role, weddingSlug, name, email }
  },

  // 4. Gửi yêu cầu quên mật khẩu (gửi OTP)
  async forgotPassword(email: string) {
    const response = await fetch(`${API_URL}/api/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Không thể gửi yêu cầu đặt lại mật khẩu!");
    }
    return resData;
  },

  // 4.1 Xác thực OTP quên mật khẩu
  async verifyForgotPasswordOtp(email: string, code: string) {
    const response = await fetch(`${API_URL}/api/auth/verify-forgot-password-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Mã OTP không chính xác hoặc đã hết hạn!");
    }
    return resData;
  },

  // 4.2 Đặt lại mật khẩu mới
  async resetPassword(email: string, code: string, passwordNew: string) {
    const response = await fetch(`${API_URL}/api/auth/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email, code, passwordNew }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đặt lại mật khẩu thất bại!");
    }
    return resData;
  },

  // 5. Đăng nhập bằng Google
  async loginWithGoogle(token: string) {
    const response = await fetch(`${API_URL}/api/auth/google`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ token }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Xác thực Google với hệ thống thất bại!");
    }
    return resData.data;
  },

  // 6. Đăng xuất hệ thống (xoá cookie)
  async logout() {
    const response = await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đăng xuất thất bại!");
    }
    return resData;
  }
};
