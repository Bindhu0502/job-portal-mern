import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function AdminAddJob() {
  const navigate = useNavigate();

  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    type: "",
    description: "",
    skills: "",
    category: "",
    companyLogo: "",
  });

  const handleChange = (e) => {
    setJob({
      ...job,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/jobs", job);

      toast.success("Job Added Successfully");

      navigate("/admin/jobs");

    } catch (error) {

      console.log(error);

      toast.error("Unable to Add Job");
    }
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "40px auto",
      }}
    >
      <h1>Add New Job</h1>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          name="title"
          placeholder="Job Title"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="company"
          placeholder="Company"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="location"
          placeholder="Location"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="salary"
          placeholder="Salary"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="experience"
          placeholder="Experience"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="type"
          placeholder="Job Type"
          onChange={handleChange}
          required
        />

        <br /><br />

        <input
          type="text"
          name="category"
          placeholder="Category"
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="skills"
          placeholder="Skills"
          rows="4"
          onChange={handleChange}
          required
        />

        <br /><br />

        <textarea
          name="description"
          placeholder="Description"
          rows="6"
          onChange={handleChange}
          required
        />

        <br /><br />

        <button
          type="submit"
        >
          Add Job
        </button>

      </form>
    </div>
  );
}

export default AdminAddJob;