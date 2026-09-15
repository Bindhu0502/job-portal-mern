import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import { useAuth } from "../../context/authcontext";


function DashboardHeader() {

  const auth = useAuth();

  const user = auth?.user;


  return (

    <header className="
      bg-white
      shadow-sm
      border-b
      px-8
      py-4
      flex
      items-center
      justify-between
    ">


      {/* Left Section */}

      <div>

        <h1 className="
          text-2xl
          font-bold
          text-gray-800
        ">

          Admin Dashboard

        </h1>


        <p className="
          text-sm
          text-gray-500
          mt-1
        ">

          Manage CareerNest platform

        </p>


      </div>





      {/* Search */}

      <div className="
        hidden
        md:flex
        items-center
        bg-gray-100
        rounded-xl
        px-4
        py-2
        w-80
      ">


        <FaSearch className="
          text-gray-400
          mr-3
        " />


        <input

          type="text"

          placeholder="Search..."

          className="
            bg-transparent
            outline-none
            w-full
            text-sm
          "

        />


      </div>





      {/* Right Section */}

      <div className="
        flex
        items-center
        gap-6
      ">



        {/* Notification */}

        <button

          className="
            relative
            text-gray-600
            hover:text-blue-600
            transition
          "

        >

          <FaBell size={22} />


          <span className="
            absolute
            -top-2
            -right-2
            bg-red-500
            text-white
            text-xs
            rounded-full
            w-5
            h-5
            flex
            items-center
            justify-center
          ">

            3

          </span>


        </button>





        {/* Profile */}

        <div className="
          flex
          items-center
          gap-3
        ">


          <FaUserCircle

            size={40}

            className="text-blue-600"

          />



          <div className="hidden md:block">


            <p className="
              font-semibold
              text-gray-800
            ">

              {user?.name || "Admin"}

            </p>



            <p className="
              text-xs
              text-gray-500
            ">

              Administrator

            </p>


          </div>


        </div>



      </div>


    </header>

  );

}


export default DashboardHeader;