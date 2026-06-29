import { describe, it, expect, vi, beforeEach } from "vitest";
import { authService } from "./authService";

describe("authService Unit Tests", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it("sendOtp success path", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ message: "OTP sent" }),
    } as Response);

    const result = await authService.sendOtp("test@example.com");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/send-otp"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@example.com" }),
      })
    );
    expect(result.message).toBe("OTP sent");
  });

  it("sendOtp error path", async () => {
    vi.spyOn(global, "fetch").mockResolvedValue({
      ok: false,
      json: async () => ({ message: "Không thể gửi mã xác thực!" }),
    } as Response);

    await expect(authService.sendOtp("invalid-email")).rejects.toThrow(
      "Không thể gửi mã xác thực!"
    );
  });

  it("verifyOtp success path", async () => {
    const mockUserData = {
      role: "user",
      weddingSlug: "abc-xyz",
      name: "Hai",
      email: "test@example.com",
    };
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockUserData }),
    } as Response);

    const result = await authService.verifyOtp("test@example.com", "123456");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/verify-otp"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@example.com", code: "123456" }),
      })
    );
    expect(result).toEqual(mockUserData);
  });

  it("loginWithGoogle success path", async () => {
    const mockUserData = { role: "user", name: "Google User" };
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ data: mockUserData }),
    } as Response);

    const result = await authService.loginWithGoogle("google-token");

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/google"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ token: "google-token" }),
      })
    );
    expect(result).toEqual(mockUserData);
  });

  it("logout success path", async () => {
    const mockFetch = vi.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ message: "Logout success" }),
    } as Response);

    const result = await authService.logout();

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/auth/logout"),
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(result.message).toBe("Logout success");
  });
});
