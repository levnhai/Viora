"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Trash2, AlertTriangle, X, Loader2 } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  type?: "danger" | "warning" | "info";
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Xác nhận hành động",
  message = "Bạn có chắc chắn muốn thực hiện hành động này?",
  confirmText = "Xóa",
  cancelText = "Hủy",
  type = "danger",
  loading = false,
}: ConfirmModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !loading) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, loading, onClose]);

  if (!isOpen || !mounted || typeof document === "undefined") return null;

  const isDanger = type === "danger";

  return createPortal(
    <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-stone-900/60 backdrop-blur-2xs animate-fade-in font-sans">
      <div
        className="fixed inset-0"
        onClick={() => {
          if (!loading) onClose();
        }}
      />
      <div className="bg-white w-full max-w-[360px] rounded-[2rem] p-6 shadow-2xl relative z-10 border border-stone-100 animate-fade-in flex flex-col items-center text-center">
        {/* Nút X đóng */}
        <button
          onClick={() => {
            if (!loading) onClose();
          }}
          disabled={loading}
          className="absolute right-4 top-4 p-1.5 text-stone-400 hover:bg-stone-50 rounded-full border-0 bg-transparent cursor-pointer flex items-center justify-center transition-colors disabled:opacity-50"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div
          className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-4 shrink-0 shadow-inner ${
            isDanger
              ? "bg-red-50 text-red-500 border border-red-100"
              : "bg-amber-50 text-amber-500 border border-amber-100"
          }`}
        >
          {isDanger ? (
            <Trash2 size={24} strokeWidth={2.2} />
          ) : (
            <AlertTriangle size={24} strokeWidth={2.2} />
          )}
        </div>

        {/* Title */}
        <h3
          className="text-lg font-bold text-stone-800 mb-2 leading-tight"
          style={{ fontFamily: "'EB Garamond', serif" }}
        >
          {title}
        </h3>

        {/* Message */}
        <p className="text-xs text-stone-500 leading-relaxed mb-6 font-medium px-2">
          {message}
        </p>

        {/* Buttons */}
        <div className="flex items-center gap-3 w-full">
          <button
            type="button"
            disabled={loading}
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl text-xs font-bold border border-stone-200 text-stone-700 bg-white hover:bg-stone-50 cursor-pointer transition-colors active:scale-98 disabled:opacity-50"
          >
            {cancelText}
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold text-white cursor-pointer transition-all active:scale-98 border-0 shadow-md flex items-center justify-center gap-1.5 ${
              isDanger
                ? "bg-red-500 hover:bg-red-600 shadow-red-500/20 disabled:bg-red-400"
                : "bg-[#1b365d] hover:bg-[#1b365d]/90 shadow-blue-900/20"
            }`}
          >
            {loading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
