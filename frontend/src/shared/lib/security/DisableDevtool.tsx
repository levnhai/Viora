"use client";

import { useEffect } from "react";
import DisableDevtoolPlugin from "disable-devtool";

export function DisableDevtool() {
  useEffect(() => {
    // 1. Kiểm tra môi trường local:
    // - Development mode (npm run dev)
    // - Hostname là localhost, 127.0.0.1, hoặc .local
    const isLocal =
      process.env.NODE_ENV !== "production" ||
      (typeof window !== "undefined" &&
        (window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.location.hostname.endsWith(".local")));

    // Trên môi trường local: Cho phép mở F12 và DevTools hoàn toàn
    if (isLocal) {
      return;
    }

    // 2. Trên môi trường Production: Chặn mở DevTools & F12
    DisableDevtoolPlugin({
      // Chuyển hướng khi phát hiện mở DevTools
      url: "about:blank",
      // Chặn menu chuột phải
      disableMenu: true,
      // Tự động xóa console log
      clearLog: true,
      // Bỏ qua nếu có cờ allow_devtool trong sessionStorage
      ignore: () => {
        if (typeof window === "undefined") return false;
        return (
          window.location.hostname === "localhost" ||
          window.location.hostname === "127.0.0.1" ||
          window.sessionStorage.getItem("allow_devtool") === "true"
        );
      },
    });
  }, []);

  return null;
}
