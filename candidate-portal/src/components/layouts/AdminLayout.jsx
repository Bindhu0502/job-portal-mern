import { Link, Outlet } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-900 text-white p-6">
        <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

        <nav className="space-y-3">
          <Link
            to="/admin/dashboard"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Dashboard
          </Link>

          <Link
            to="/admin/users"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Users
          </Link>

          <Link
            to="/admin/companies"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Companies
          </Link>

          <Link
            to="/admin/jobs"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Jobs
          </Link>

          <Link
            to="/admin/applications"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Applications
          </Link>

          <Link
            to="/admin/settings"
            className="block px-4 py-2 rounded hover:bg-gray-800"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white shadow px-8 py-5">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </header>

        {/* Page Content */}
        <main className="p-8">
          {children ? children : <Outlet />}
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;