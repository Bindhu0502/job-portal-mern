function PersonalInfo({ profile, handleChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile?.name || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={profile?.email || ""}
            disabled
            className="w-full border rounded-xl p-4 bg-gray-100 dark:bg-slate-800 dark:border-slate-700"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Phone
          </label>

          <input
            type="text"
            name="phone"
            value={profile?.phone || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Gender
          </label>

          <select
            name="gender"
            value={profile?.gender || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={profile?.dateOfBirth || ""}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Headline
          </label>

          <input
            type="text"
            name="headline"
            value={profile?.headline || ""}
            onChange={handleChange}
            placeholder="MERN Stack Developer"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
          />
        </div>

      </div>

      <div className="mt-8">
        <label className="block mb-2 font-medium dark:text-gray-300">
          Bio
        </label>

        <textarea
          rows="5"
          name="bio"
          value={profile?.bio || ""}
          onChange={handleChange}
          className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white"
        />
      </div>
    </div>
  );
}

export default PersonalInfo;