import { useEffect, useState } from "react";
import api from "../../services/api";


function ApplicationForm({ jobId, closeForm }) {


  const [user,setUser] = useState({});

  const [coverLetter,setCoverLetter] =
    useState("");

  const [phone,setPhone] =
    useState("");

  const [loading,setLoading] =
    useState(false);



  // Fetch user profile

  useEffect(()=>{

    fetchUser();

  },[]);



  const fetchUser = async()=>{

    try{

      const res =
        await api.get("/users/profile");


      setUser(res.data.user);


      setPhone(
        res.data.user.phone || ""
      );


    }
    catch(error){

      console.log(error);

    }

  };




  const submitApplication = async(e)=>{

    e.preventDefault();


    try{

      setLoading(true);



      const res =
      await api.post(
        "/applications/apply",
        {

          jobId,

          phone,

          coverLetter,

          resume:
          user.resume

        }
      );



      alert(
        res.data.message
      );


      closeForm();


    }

    catch(error){

      alert(
        error.response?.data?.message ||
        "Application failed"
      );

    }

    finally{

      setLoading(false);

    }

  };





  return (

    <div
      className="
      fixed
      inset-0
      bg-black/40
      flex
      items-center
      justify-center
      z-50
      px-4
      "
    >


      <form

        onSubmit={submitApplication}

        className="
        bg-white
        rounded-2xl
        p-8
        w-full
        max-w-xl
        max-h-[90vh]
        overflow-y-auto
        "

      >



        <h2
          className="
          text-2xl
          font-bold
          mb-6
          "
        >

          Apply For Job

        </h2>





        {/* Name */}

        <label className="font-medium">
          Full Name
        </label>


        <input

          value={
            user.name || ""
          }

          disabled

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          bg-gray-100
          "

        />







        {/* Email */}

        <label className="font-medium mt-4 block">
          Email
        </label>


        <input

          value={
            user.email || ""
          }

          disabled

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          bg-gray-100
          "

        />







        {/* Phone */}

        <label className="font-medium mt-4 block">
          Phone Number
        </label>


        <input

          value={phone}

          onChange={(e)=>
            setPhone(e.target.value)
          }

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          "

          placeholder="Enter phone number"

        />







        {/* Location */}

        <label className="font-medium mt-4 block">
          Location
        </label>


        <input

          value={

            `${user.city || ""} ${user.state || ""}`

          }

          disabled

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          bg-gray-100
          "

        />








        {/* Skills */}

        <label className="font-medium mt-4 block">
          Skills
        </label>


        <input

          value={
            user.skills?.join(", ") || ""
          }

          disabled

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          bg-gray-100
          "

        />








        {/* Resume */}

        <label className="font-medium mt-4 block">
          Resume
        </label>


        {

          user.resume ?

          <a

            href={
              `http://localhost:5000${user.resume}`
            }

            target="_blank"

            className="
            text-blue-600
            underline
            block
            mt-2
            "

          >

            View Uploaded Resume

          </a>


          :

          <p className="text-red-500 mt-2">
            No resume uploaded. Upload resume in profile.
          </p>

        }







        {/* Cover Letter */}

        <label className="font-medium mt-4 block">
          Cover Letter
        </label>


        <textarea

          value={coverLetter}

          onChange={(e)=>
            setCoverLetter(
              e.target.value
            )
          }

          rows="5"

          placeholder="Write your message to recruiter"

          className="
          w-full
          border
          rounded-lg
          p-3
          mt-2
          "

        />








        <div
          className="
          flex
          gap-3
          mt-6
          "
        >


          <button

            type="button"

            onClick={closeForm}

            className="
            flex-1
            border
            py-3
            rounded-lg
            "

          >

            Cancel

          </button>




          <button

            disabled={loading}

            className="
            flex-1
            bg-blue-600
            text-white
            rounded-lg
            "

          >

            {
              loading
              ?
              "Submitting..."
              :
              "Submit Application"
            }


          </button>



        </div>



      </form>


    </div>

  );

}


export default ApplicationForm;