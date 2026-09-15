import {
  FaArrowUp,
} from "react-icons/fa";

function StatCard({
  title,
  value,
  icon,
  color,
  percentage,
}) {
  return (
    <div
      className="
        bg-white 
        rounded-2xl 
        shadow-md 
        p-6 
        hover:shadow-xl 
        transition
      "
    >

      <div className="flex items-center justify-between">


        {/* Left Content */}
        <div>

          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>


          <h2 className="text-3xl font-bold text-gray-800 mt-3">
            {value}
          </h2>


          {percentage && (

            <div className="flex items-center gap-2 mt-3 text-green-600">

              <FaArrowUp />

              <span className="text-sm font-medium">
                {percentage}% this month
              </span>

            </div>

          )}

        </div>


        {/* Icon */}
        <div
          className={`
            ${color}
            w-14
            h-14
            rounded-full
            flex
            items-center
            justify-center
            text-white
            text-2xl
          `}
        >
          {icon}
        </div>


      </div>

    </div>
  );
}

export default StatCard;