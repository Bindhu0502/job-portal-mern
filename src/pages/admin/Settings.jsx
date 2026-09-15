import AdminLayout from "../../components/layouts/AdminLayout";

function Settings() {
  return (
    <AdminLayout>

      <h1 className="text-3xl font-bold mb-8">
        Settings
      </h1>

      <div className="bg-white rounded-xl shadow p-8">

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Admin Name
          </label>

          <input
            type="text"
            className="border rounded-lg p-3 w-full"
            placeholder="Admin Name"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Email
          </label>

          <input
            type="email"
            className="border rounded-lg p-3 w-full"
            placeholder="admin@gmail.com"
          />

        </div>

        <div className="mb-6">

          <label className="block mb-2 font-semibold">
            Change Password
          </label>

          <input
            type="password"
            className="border rounded-lg p-3 w-full"
            placeholder="New Password"
          />

        </div>

        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg">
          Save Changes
        </button>

      </div>

    </AdminLayout>
  );
}

export default Settings;