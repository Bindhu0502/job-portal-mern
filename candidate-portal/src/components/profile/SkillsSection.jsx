import { useState } from "react";

function SkillsSection({ profile, setProfile }) {
  const [skill, setSkill] = useState("");

  // ======================
  // Add Skill
  // ======================

  const addSkill = () => {
    const value = skill.trim();

    if (!value) return;

    // Prevent duplicate skills
    if (
      profile.skills.some(
        (item) => item.toLowerCase() === value.toLowerCase()
      )
    ) {
      setSkill("");
      return;
    }

    setProfile((prev) => ({
      ...prev,
      skills: [...prev.skills, value],
    }));

    setSkill("");
  };

  // ======================
  // Remove Skill
  // ======================

  const removeSkill = (index) => {
    setProfile((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  // ======================
  // Enter Key
  // ======================

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Skills
      </h2>

      {/* Add Skill */}

      <div className="flex gap-3">

        <input
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Example: React JS"
          className="flex-1 border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={addSkill}
          className="px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition"
        >
          Add
        </button>

      </div>

      {/* Skills */}

      <div className="mt-8 flex flex-wrap gap-3">

        {profile.skills.length === 0 ? (
          <div className="w-full text-center py-10 border-2 border-dashed rounded-2xl text-gray-500">
            No skills added yet.
          </div>
        ) : (
          profile.skills.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-3 bg-blue-100 dark:bg-blue-900 px-5 py-3 rounded-full"
            >
              <span className="font-medium dark:text-white">
                {item}
              </span>

              <button
                onClick={() => removeSkill(index)}
                className="text-red-500 hover:text-red-700 text-lg font-bold"
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

export default SkillsSection;