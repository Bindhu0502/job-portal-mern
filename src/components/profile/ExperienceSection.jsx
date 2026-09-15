import { useState } from "react";

function ExperienceSection({ profile, setProfile }) {
  const [experience, setExperience] = useState({
    company: "",
    role: "",
    duration: "",
  });

  const handleChange = (e) => {
    setExperience((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const addExperience = () => {
    if (
      !experience.company.trim() ||
      !experience.role.trim() ||
      !experience.duration.trim()
    ) {
      alert("Please fill all experience fields.");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      experience: [...prev.experience, experience],
    }));

    setExperience({
      company: "",
      role: "",
      duration: "",
    });
  };

  const removeExperience = (index) => {
    setProfile((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Experience
      </h2>

      {/* Input Form */}

      <div className="grid md:grid-cols-3 gap-4">
        <input
          type="text"
          name="company"
          value={experience.company}
          onChange={handleChange}
          placeholder="Company Name"
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="role"
          value={experience.role}
          onChange={handleChange}
          placeholder="Job Role"
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />

        <input
          type="text"
          name="duration"
          value={experience.duration}
          onChange={handleChange}
          placeholder="Jan 2025 - Present"
          className="border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <button
        onClick={addExperience}
        className="mt-5 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl transition"
      >
        Add Experience
      </button>

      {/* Experience List */}

      <div className="mt-8 space-y-4">
        {profile.experience.length === 0 ? (
          <div className="text-center py-10 border-2 border-dashed rounded-2xl text-gray-500">
            No experience added yet.
          </div>
        ) : (
          profile.experience.map((exp, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex justify-between items-start dark:border-slate-700"
            >
              <div>
                <h3 className="text-lg font-semibold dark:text-white">
                  {exp.role}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 mt-1">
                  {exp.company}
                </p>

                <p className="text-gray-500 mt-1">
                  {exp.duration}
                </p>
              </div>

              <button
                onClick={() => removeExperience(index)}
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

export default ExperienceSection;