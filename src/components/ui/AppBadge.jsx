function AppBadge({ children, className = "" }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 ${className}`}
    >
      {children}
    </span>
  );
}

export default AppBadge;