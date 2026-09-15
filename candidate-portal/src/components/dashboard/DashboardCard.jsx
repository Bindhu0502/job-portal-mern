import React from "react";

const DashboardCard = ({
  title,
  value,
  icon,
  gradient,
  subtitle,
}) => {
  return (
    <div
      className={`
        relative
        overflow-hidden
        rounded-2xl
        shadow-lg
        ${gradient}
        text-white
        p-6
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-2xl
      `}
    >
      {/* Background Circle */}
      <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-white/10"></div>

      {/* Icon */}
      <div className="text-4xl mb-5">
        {icon}
      </div>

      {/* Title */}
      <h3 className="text-lg font-medium opacity-90">
        {title}
      </h3>

      {/* Value */}
      <h1 className="text-4xl font-bold mt-2">
        {value}
      </h1>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-sm text-white/80">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default DashboardCard;