function AuthButton({
  children,
  loading,
  type = "button"
}) {


  return (

    <button

      type={type}

      disabled={loading}

      className="
      w-full
      bg-blue-600
      hover:bg-blue-700
      text-white
      font-semibold
      py-3
      rounded-lg
      transition
      duration-300
      disabled:opacity-60
      disabled:cursor-not-allowed
      "

    >

      {
        loading
        ?
        "Please wait..."
        :
        children
      }


    </button>

  );

}


export default AuthButton;