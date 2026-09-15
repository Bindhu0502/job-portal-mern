import React from "react";
import clsx from "clsx";

const Input = ({
  label,
  error,
  icon,
  className,
  ...props
}) => {
  return (
    <div className="space-y-2">
      {label && (
        <label className="text-sm font-medium text-slate-900 dark:text-white">
          {label}
        </label>
      )}

      <div className="relative">
        {icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
            {icon}
          </div>
        )}

        <input
          className={clsx(
            "h-12 w-full rounded-2xl",
            "border border-slate-200 dark:border-slate-700",
            "bg-slate-50 dark:bg-slate-800",
            "text-slate-900 dark:text-white",
            "placeholder:text-slate-400",
            "outline-none",
            "focus:border-blue-600",
            "focus:ring-2 focus:ring-blue-200",
            icon ? "pl-12 pr-4" : "px-4",
            className
          )}
          {...props}
        />
      </div>

      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
    </div>
  );
};

export default Input;