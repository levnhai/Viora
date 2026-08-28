"use client";

import { useEffect } from "react";
import DisableDevtoolPlugin from "disable-devtool";

export function DisableDevtool() {
  useEffect(() => {
    // Chỉ kích hoạt ở môi trường Production
    if (process.env.NODE_ENV !== "production") return;

    DisableDevtoolPlugin({
      // Chuyển hướng khi phát hiện mở DevTools
      url: "about:blank",
      // Chặn menu chuột phải
      disableMenu: true,
      // Tự động xóa sạch console log
      clearLog: true,
    });
  }, []);

  return null;
}
