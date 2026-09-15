function JobSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 animate-pulse">

      {/* Title */}
      <div className="h-6 bg-gray-300 rounded w-2/3 mb-3"></div>

      {/* Company */}
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-6"></div>

      {/* Job Info */}
      <div className="space-y-3">

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded"></div>

      </div>

      {/* Skills */}
      <div className="flex gap-2 mt-6">

        <div className="h-8 w-20 rounded-full bg-gray-200"></div>

        <div className="h-8 w-20 rounded-full bg-gray-200"></div>

        <div className="h-8 w-20 rounded-full bg-gray-200"></div>

      </div>

      {/* Description */}
      <div className="space-y-2 mt-6">

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded"></div>

        <div className="h-4 bg-gray-200 rounded w-3/4"></div>

      </div>

      {/* Button */}
      <div className="flex justify-between items-center mt-8">

        <div className="h-10 w-32 rounded-xl bg-gray-300"></div>

        <div className="h-4 w-20 rounded bg-gray-200"></div>

      </div>

    </div>
  );
}

export default JobSkeleton;