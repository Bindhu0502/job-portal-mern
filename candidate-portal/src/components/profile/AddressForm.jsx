function AddressForm({ profile, handleChange }) {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl p-8">

      <h2 className="text-3xl font-bold mb-8 dark:text-white">
        Address
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        <div className="md:col-span-2">
          <label className="block mb-2 font-medium dark:text-gray-300">
            Street Address
          </label>

          <input
            type="text"
            name="address"
            value={profile.address}
            onChange={handleChange}
            placeholder="Enter your address"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            City
          </label>

          <input
            type="text"
            name="city"
            value={profile.city}
            onChange={handleChange}
            placeholder="Hyderabad"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            State
          </label>

          <input
            type="text"
            name="state"
            value={profile.state}
            onChange={handleChange}
            placeholder="Telangana"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium dark:text-gray-300">
            Country
          </label>

          <input
            type="text"
            name="country"
            value={profile.country}
            onChange={handleChange}
            placeholder="India"
            className="w-full border rounded-xl p-4 dark:bg-slate-800 dark:border-slate-700 dark:text-white focus:ring-2 focus:ring-blue-500"
          />
        </div>

      </div>

    </div>
  );
}

export default AddressForm;