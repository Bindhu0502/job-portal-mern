function PersonalInfo({ profile, handleChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Personal Information
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {/* Full Name */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border rounded-xl p-4 bg-gray-100 dark:bg-slate-800 dark:text-gray-400 dark:border-slate-700 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Phone Number
          </label>

          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="9876543210"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Gender */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Gender
          </label>

          <select
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Date of Birth */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Date of Birth
          </label>

          <input
            type="date"
            name="dateOfBirth"
            value={profile.dateOfBirth}
            onChange={handleChange}
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Headline */}
        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Professional Headline
          </label>

          <input
            type="text"
            name="headline"
            value={profile.headline}
            onChange={handleChange}
            placeholder="Frontend Developer | MERN Stack Developer"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

      {/* Bio */}
      <div className="mt-8">

        <label className="block mb-2 font-medium dark:text-gray-300">
          About Yourself
        </label>

        <textarea
          rows={6}
          name="bio"
          value={profile.bio}
          onChange={handleChange}
          placeholder="Tell recruiters about yourself..."
          className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white resize-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-sm text-gray-500 mt-2">
          Write a short introduction highlighting your skills,
          achievements, and career goals.
        </p>

      </div>

    </div>
  );
}

export default PersonalInfo;