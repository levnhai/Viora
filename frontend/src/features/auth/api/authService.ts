const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authService = {
  // 1. Gửi OTP qua Email
  async sendOtp(email: string) {
    const response = await fetch(`${API_URL}/api/auth/send-otp`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ email }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Không thể gửi mã xác thực!");
    }
    return resData;
  },

  // 2. Xác thực OTP
  async verifyOtp(email: string, code: string) {
    const response = await fetch(`${API_URL}/api/auth/verify-otp`, {
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

  // 3. Đăng nhập bằng Google
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

  // 4. Đăng nhập bằng Facebook (API login của hệ thống)
  async loginWithFacebook(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: email, password }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đăng nhập bằng Facebook thất bại!");
    }
    return resData.data;
  },

  // 5. Đăng ký Facebook (trong luồng giả lập của hệ thống)
  async registerFacebook(email: string, password: string) {
    const response = await fetch(`${API_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({ username: email, password }),
    });
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.message || "Đăng ký tài khoản thất bại!");
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
