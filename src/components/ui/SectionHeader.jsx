function SectionHeader({
  title,
  subtitle,
  action,
}) {
  return (
    <div className="flex items-end justify-between mb-10">
      <div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-2 text-slate-600 dark:text-slate-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

export default SectionHeader;