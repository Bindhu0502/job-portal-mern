import { Link } from "react-router-dom";


function AuthLayout({ children }) {


  return (

    <div
      className="
      min-h-screen
      bg-white
      flex
      "
    >



      {/* Left Section */}


      <div
        className="
        hidden
        lg:flex
        w-1/2
        bg-blue-600
        text-white
        flex-col
        justify-center
        px-16
        "
      >


        <Link
          to="/"
          className="
          text-4xl
          font-bold
          mb-8
          "
        >

          CareerHub

        </Link>




        <h1
          className="
          text-5xl
          font-bold
          leading-tight
          "
        >

          Find Your
          <br/>
          Dream Job

        </h1>




        <p
          className="
          mt-6
          text-blue-100
          text-lg
          "
        >

          Discover verified opportunities from startups
          and leading companies. Build your career
          with confidence.

        </p>





        <div
          className="
          mt-10
          space-y-5
          "
        >


          <Feature
            title="Verified Jobs"
            text="Apply only to trusted and verified job listings."
          />


          <Feature
            title="Top Companies"
            text="Connect with startups and leading tech companies."
          />


          <Feature
            title="Easy Applications"
            text="Apply quickly and track your applications."
          />


        </div>


      </div>







      {/* Right Section */}


      <div
        className="
        w-full
        lg:w-1/2
        flex
        items-center
        justify-center
        bg-gray-50
        px-6
        "
      >


        <div
          className="
          w-full
          max-w-md
          bg-white
          rounded-2xl
          shadow-xl
          border
          border-gray-200
          p-8
          "
        >

          {children}


        </div>


      </div>



    </div>

  );

}





function Feature({title,text}){


return (

<div
className="
bg-white/10
border
border-white/20
rounded-xl
p-5
"
>


<h3
className="
font-bold
text-lg
"
>

{title}

</h3>


<p
className="
text-blue-100
mt-1
"
>

{text}

</p>


</div>

);


}


export default AuthLayout;