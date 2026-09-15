import { useState } from "react";


function AuthInput({
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  icon,
  error
}) {


  const [show,setShow] =
    useState(false);



  return (

    <div className="mb-5">


      <label
        className="
        block
        text-sm
        font-medium
        text-gray-700
        mb-2
        "
      >

        {label}

      </label>




      <div
        className="
        relative
        "
      >


        <div
          className="
          absolute
          left-3
          top-3
          text-gray-400
          "
        >

          {icon}

        </div>



        <input

          name={name}

          type={
            type==="password" && show
            ? "text"
            : type
          }

          placeholder={placeholder}

          value={value}

          onChange={onChange}

          className="
          w-full
          rounded-lg
          border
          border-gray-300
          bg-white
          text-gray-900
          py-3
          pl-10
          pr-4
          outline-none
          focus:ring-2
          focus:ring-blue-500
          "
        />



      </div>



      {
        error &&

        <p
          className="
          text-red-500
          text-sm
          mt-2
          "
        >

          {error}

        </p>

      }


    </div>

  );

}


export default AuthInput;