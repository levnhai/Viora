import { useState, useEffect } from "react";
import { io, Socket } from "socket.io-client";
import { SOCKET_URL } from "@/shared/lib/config";
import { fetchRealtimeOnline } from "../api/analyticsApi";

export const useRealtimeOnline = () => {
  const [onlineCount, setOnlineCount] = useState<number>(0);
  const [isLive, setIsLive] = useState<boolean>(false);

  useEffect(() => {
    let socket: Socket | null = null;
    let fallbackInterval: NodeJS.Timeout | null = null;

    try {
      socket = io(SOCKET_URL, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        reconnectionDelay: 3000,
      });

      socket.on("connect", () => {
        setIsLive(true);
        socket?.emit("join-admin-stats");
      });

      socket.on("online-users-count", (data: { count: number }) => {
        if (typeof data?.count === "number") {
          setOnlineCount(Math.max(0, data.count));
        }
      });

      socket.on("disconnect", () => {
        setIsLive(false);
      });

      socket.on("connect_error", () => {
        setIsLive(false);
      });
    } catch {
      setIsLive(false);
    }

    // Fallback polling mỗi 15s nếu socket không nhận sự kiện
    const pollRealtime = async () => {
      const count = await fetchRealtimeOnline();
      setOnlineCount(Math.max(0, count));
    };
    pollRealtime();
    fallbackInterval = setInterval(pollRealtime, 15000);

    return () => {
      if (fallbackInterval) clearInterval(fallbackInterval);
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return { onlineCount, isLive };
};
