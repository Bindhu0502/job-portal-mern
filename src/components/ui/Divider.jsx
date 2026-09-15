function Divider({ text = "OR" }) {
  return (
    <div className="my-6 flex items-center">
      <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>

      <span className="mx-4 text-sm text-gray-500 dark:text-gray-400">
        {text}
      </span>

      <div className="flex-1 border-t border-gray-300 dark:border-gray-700"></div>
    </div>
  );
}

export default Divider;