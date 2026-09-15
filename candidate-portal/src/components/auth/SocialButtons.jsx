import {
  FcGoogle
} from "react-icons/fc";

import {
  FaGithub
} from "react-icons/fa";


function SocialButtons(){


  return (

    <div
      className="
      space-y-3
      "
    >



      <button

        className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        border
        border-gray-300
        bg-white
        text-gray-700
        py-3
        rounded-lg
        hover:bg-gray-50
        transition
        "

      >

        <FcGoogle size={22}/>


        Continue with Google


      </button>





      <button

        className="
        w-full
        flex
        items-center
        justify-center
        gap-3
        border
        border-gray-300
        bg-white
        text-gray-700
        py-3
        rounded-lg
        hover:bg-gray-50
        transition
        "

      >


        <FaGithub
          size={22}
        />


        Continue with GitHub


      </button>



    </div>

  );

}


export default SocialButtons;