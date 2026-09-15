function AuthHeader({
  title,
  subtitle
}) {


  return (

    <div
      className="
      text-center
      mb-8
      "
    >


      <h1
        className="
        text-3xl
        font-bold
        text-gray-900
        "
      >

        {title}

      </h1>




      <p
        className="
        mt-3
        text-gray-500
        text-sm
        "
      >

        {subtitle}

      </p>



    </div>

  );

}


export default AuthHeader;