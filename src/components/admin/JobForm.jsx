import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../../api/api";
import Loader from "../common/Loader";
import "../../styles/jobForm.css";

function JobForm({ mode }) {
  const navigate = useNavigate();
  const { id } = useParams();

  const isEdit = mode === "edit";

  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    salary: "",
    experience: "",
    type: "Full Time",
    category: "",
    companyLogo: "",
    skills: "",
    description: "",
  });

  useEffect(() => {
    if (isEdit) {
      fetchJob();
    }
  }, []);

  const fetchJob = async () => {
    try {
      const response = await api.get(`/jobs/${id}`);

      const job = response.data.job;

      setFormData({
        title: job.title || "",
        company: job.company || "",
        location: job.location || "",
        salary: job.salary || "",
        experience: job.experience || "",
        type: job.type || "Full Time",
        category: job.category || "",
        companyLogo: job.companyLogo || "",
        skills: Array.isArray(job.skills)
          ? job.skills.join(", ")
          : job.skills || "",
        description: job.description || "",
      });
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Failed to load job"
      );

      navigate("/admin/jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.title ||
      !formData.company ||
      !formData.location ||
      !formData.salary ||
      !formData.experience ||
      !formData.skills ||
      !formData.description
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    try {
      setSaving(true);

      const payload = {
        ...formData,
        skills: formData.skills
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      let response;

      if (isEdit) {
        response = await api.put(`/jobs/${id}`, payload);
      } else {
        response = await api.post("/jobs", payload);
      }

      toast.success(response.data.message);

      navigate("/admin/jobs");
    } catch (error) {
      console.log(error);

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="job-form-page">
      <div className="job-form-card">

        <div className="job-form-header">

          <h1>
            {isEdit ? "Edit Job" : "Add New Job"}
          </h1>

          <p>
            {isEdit
              ? "Update job information."
              : "Create a new job posting."}
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          <div className="job-grid">

            <div className="form-group">
              <label>Job Title *</label>

              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Frontend Developer"
              />
            </div>

            <div className="form-group">
              <label>Company *</label>

              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="Infosys"
              />
            </div>

            <div className="form-group">
              <label>Location *</label>

              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Hyderabad"
              />
            </div>

            <div className="form-group">
              <label>Salary *</label>

              <input
                name="salary"
                value={formData.salary}
                onChange={handleChange}
                placeholder="8 LPA"
              />
            </div>

            <div className="form-group">
              <label>Experience *</label>

              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="2+ Years"
              />
            </div>

            <div className="form-group">
              <label>Job Type *</label>

              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
              >
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Internship</option>
                <option>Remote</option>
                <option>Contract</option>
              </select>
            </div>

            <div className="form-group">
              <label>Category</label>

              <input
                name="category"
                value={formData.category}
                onChange={handleChange}
                placeholder="Software Development"
              />
            </div>

            <div className="form-group">
              <label>Company Logo URL</label>

              <input
                name="companyLogo"
                value={formData.companyLogo}
                onChange={handleChange}
                placeholder="https://..."
              />
            </div>

          </div>

          <div className="form-group">
            <label>Skills *</label>

            <input
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          <div className="form-group">
            <label>Description *</label>

            <textarea
              rows="7"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Job Description..."
            />
          </div>

          <div className="job-form-buttons">

            <button
              type="button"
              className="cancel-button"
              onClick={() => navigate("/admin/jobs")}
            >
              Cancel
            </button>

            <button
              type="submit"
              className="save-button"
              disabled={saving}
            >
              {saving
                ? isEdit
                  ? "Updating..."
                  : "Adding..."
                : isEdit
                ? "Update Job"
                : "Add Job"}
            </button>

          </div>

        </form>

      </div>
    </div>
  );
}

export default JobForm;