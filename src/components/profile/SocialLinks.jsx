function SocialLinks({ profile, handleChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Social Links
      </h2>

      <div className="grid md:grid-cols-3 gap-6">

        {/* GitHub */}

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            GitHub
          </label>

          <input
            type="url"
            name="github"
            value={profile.github}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* LinkedIn */}

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            LinkedIn
          </label>

          <input
            type="url"
            name="linkedin"
            value={profile.linkedin}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Portfolio */}

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Portfolio
          </label>

          <input
            type="url"
            name="portfolio"
            value={profile.portfolio}
            onChange={handleChange}
            placeholder="https://yourportfolio.com"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

    </div>
  );
}

export default SocialLinks;