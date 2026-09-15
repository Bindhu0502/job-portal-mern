import { useState } from "react";

function EducationSection({ profile, setProfile }) {
  const [education, setEducation] = useState({
    degree: "",
    college: "",
    year: "",
  });

  const handleChange = (e) => {
    setEducation((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addEducation = () => {
    if (
      !education.degree.trim() ||
      !education.college.trim() ||
      !education.year.trim()
    ) {
      alert("Please fill all education fields.");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      education: [...prev.education, education],
    }));

    setEducation({
      degree: "",
      college: "",
      year: "",
    });
  };

  const removeEducation = (index) => {
    setProfile((prev) => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Education
      </h2>

      {/* Form */}

      <div className="grid md:grid-cols-3 gap-4">

        <input
          type="text"
          name="degree"
          placeholder="Degree"
          value={education.degree}
          onChange={handleChange}
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />

        <input
          type="text"
          name="college"
          placeholder="College / University"
          value={education.college}
          onChange={handleChange}
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />

        <input
          type="text"
          name="year"
          placeholder="2025"
          value={education.year}
          onChange={handleChange}
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />

      </div>

      <button
        onClick={addEducation}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
      >
        Add Education
      </button>

      {/* Education List */}

      <div className="mt-8 space-y-4">

        {profile.education.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed rounded-2xl text-gray-500">
            No education added yet.
          </div>
        ) : (
          profile.education.map((edu, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex justify-between items-start dark:border-slate-700"
            >
              <div>

                <h3 className="text-lg font-semibold dark:text-white">
                  {edu.degree}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {edu.college}
                </p>

                <p className="text-gray-500 mt-1">
                  {edu.year}
                </p>

              </div>

              <button
                onClick={() => removeEducation(index)}
                className="text-red-500 hover:text-red-700 text-xl font-bold"
              >
                ×
              </button>

            </div>
          ))
        )}

      </div>

    </div>
  );
}

export default EducationSection;