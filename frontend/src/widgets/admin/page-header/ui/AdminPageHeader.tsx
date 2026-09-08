"use client";

import { ReactNode } from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface AdminPageHeaderProps {
  breadcrumbs?: BreadcrumbItem[];
  title: string;
  description?: string;
  icon?: ReactNode;
  badge?: ReactNode;
  actions?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export function AdminPageHeader({
  breadcrumbs,
  title,
  description,
  icon,
  badge,
  actions,
  children,
  className = "",
}: AdminPageHeaderProps) {
  return (
    <div className={`space-y-3 mb-6 ${className}`}>
      {/* Breadcrumbs */}
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <Link
            href="/admin"
            className="flex items-center gap-1 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1 -m-1 rounded-md"
          >
            <Home size={13} />
            <span className="sr-only sm:not-sr-only sm:inline-block">Admin</span>
          </Link>
          {breadcrumbs.map((item, idx) => {
            const isLast = idx === breadcrumbs.length - 1;
            return (
              <div key={idx} className="flex items-center gap-1.5">
                <ChevronRight size={12} className="text-slate-400 dark:text-slate-600" />
                {item.href && !isLast ? (
                  <Link
                    href={item.href}
                    className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-1 -m-1 rounded-md font-medium"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <span className={`font-medium ${isLast ? "text-slate-900 dark:text-slate-200" : ""}`}>
                    {item.label}
                  </span>
                )}
              </div>
            );
          })}
        </nav>
      )}

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            {icon && (
              <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-100 dark:border-indigo-900/60 text-indigo-600 dark:text-indigo-400 shadow-xs">
                {icon}
              </div>
            )}
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2.5">
              {title}
              {badge && <div>{badge}</div>}
            </h1>
          </div>
          {description && (
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              {description}
            </p>
          )}
        </div>

        {/* Action Buttons Toolbar */}
        {actions && (
          <div className="flex items-center flex-wrap gap-2.5 shrink-0 self-start sm:self-auto">
            {actions}
          </div>
        )}
      </div>

      {children && <div className="pt-2">{children}</div>}
    </div>
  );
}
