function CreateCompany() {
  return (
    <div className="max-w-3xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-6">
        Create Company
      </h1>

      <form className="bg-white shadow rounded-xl p-6 space-y-4">

        <input
          type="text"
          placeholder="Company Name"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Website"
          className="w-full border rounded-lg p-3"
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full border rounded-lg p-3"
        />

        <textarea
          placeholder="Description"
          rows="5"
          className="w-full border rounded-lg p-3"
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-lg"
        >
          Create Company
        </button>

      </form>
    </div>
  );
}

export default CreateCompany;