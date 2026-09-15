import { useEffect, useMemo, useState } from "react";
import {
  FaTrash,
  FaBan,
  FaCheck,
  FaSearch,
  FaUserShield,
  FaUsers,
  FaUserTie,
} from "react-icons/fa";
import toast from "react-hot-toast";

import api from "../../services/api";

function Users() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [role, setRole] = useState("");

  const [processingId, setProcessingId] = useState(null);

  // ============================================================
  // FETCH USERS
  // ============================================================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await api.get(
        "/admin/users"
      );

      console.log(
        "ADMIN USERS RESPONSE:",
        response.data
      );

      setUsers(
        Array.isArray(response.data?.users)
          ? response.data.users
          : []
      );
    } catch (error) {
      console.error(
        "ADMIN USERS ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  // ============================================================
  // INITIAL LOAD
  // ============================================================

  useEffect(() => {
    fetchUsers();
  }, []);

  // ============================================================
  // UPDATE ROLE
  // ============================================================

  const updateRole = async (
    id,
    newRole
  ) => {
    try {
      setProcessingId(id);

      await api.put(
        `/admin/users/${id}`,
        {
          role: newRole,
        }
      );

      toast.success(
        "User role updated successfully"
      );

      await fetchUsers();
    } catch (error) {
      console.error(
        "UPDATE ROLE ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update role"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ============================================================
  // UPDATE STATUS
  // ============================================================

  const updateStatus = async (
    id,
    status
  ) => {
    try {
      setProcessingId(id);

      await api.put(
        `/admin/users/${id}/status`,
        {
          status,
        }
      );

      toast.success(
        status === "blocked"
          ? "User blocked successfully"
          : "User activated successfully"
      );

      await fetchUsers();
    } catch (error) {
      console.error(
        "UPDATE STATUS ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Unable to update status"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ============================================================
  // DELETE USER
  // ============================================================

  const deleteUser = async (id) => {
    const confirmed =
      window.confirm(
        "Are you sure you want to delete this user?"
      );

    if (!confirmed) {
      return;
    }

    try {
      setProcessingId(id);

      await api.delete(
        `/admin/users/${id}`
      );

      toast.success(
        "User deleted successfully"
      );

      setUsers((previousUsers) =>
        previousUsers.filter(
          (user) =>
            user._id !== id
        )
      );
    } catch (error) {
      console.error(
        "DELETE USER ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
          "Failed to delete user"
      );
    } finally {
      setProcessingId(null);
    }
  };

  // ============================================================
  // FILTER USERS
  // ============================================================

  const filteredUsers = useMemo(() => {
    const searchValue =
      search.trim().toLowerCase();

    return users.filter((user) => {
      const matchesSearch =
        !searchValue ||
        user.name
          ?.toLowerCase()
          .includes(searchValue) ||
        user.email
          ?.toLowerCase()
          .includes(searchValue);

      const matchesRole =
        !role ||
        user.role === role;

      return (
        matchesSearch &&
        matchesRole
      );
    });
  }, [users, search, role]);

  // ============================================================
  // COUNTS
  // ============================================================

  const candidateCount =
    users.filter(
      (user) =>
        user.role === "candidate"
    ).length;

  const recruiterCount =
    users.filter(
      (user) =>
        user.role === "recruiter"
    ).length;

  const adminCount =
    users.filter(
      (user) =>
        user.role === "admin"
    ).length;

  // ============================================================
  // STATUS HELPER
  // ============================================================

  const isBlocked = (user) => {
    return (
      user.status === "blocked" ||
      user.accountStatus === "blocked"
    );
  };

  // ============================================================
  // LOADING
  // ============================================================

  if (loading) {
    return (
      <div className="min-h-[500px] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin" />

        <p className="mt-4 text-slate-500">
          Loading users...
        </p>
      </div>
    );
  }

  // ============================================================
  // UI
  // ============================================================

  return (
    <div className="space-y-6">

      {/* ======================================================
          HEADER
      ====================================================== */}

      <div>
        <h1 className="text-3xl font-bold text-slate-900">
          Users
        </h1>

        <p className="text-slate-500 mt-1">
          Manage CareerHub users and their access.
        </p>
      </div>

      {/* ======================================================
          SUMMARY CARDS
      ====================================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Total Users
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {users.length}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
              <FaUsers />
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Candidates
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {candidateCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-green-100 text-green-600 flex items-center justify-center">
              <FaUsers />
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Recruiters
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {recruiterCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-purple-100 text-purple-600 flex items-center justify-center">
              <FaUserTie />
            </div>

          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-2xl p-5">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-500">
                Admins
              </p>

              <p className="text-2xl font-bold text-slate-900 mt-1">
                {adminCount}
              </p>
            </div>

            <div className="w-11 h-11 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
              <FaUserShield />
            </div>

          </div>
        </div>

      </div>

      {/* ======================================================
          FILTERS
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl p-5">

        <div className="flex flex-col md:flex-row gap-4">

          {/* SEARCH */}

          <div className="relative flex-1">

            <FaSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-400
              "
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Search by name or email..."
              className="
                w-full
                border
                border-slate-300
                rounded-xl
                pl-11
                pr-4
                py-3
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>

          {/* ROLE */}

          <select
            value={role}
            onChange={(event) =>
              setRole(
                event.target.value
              )
            }
            className="
              border
              border-slate-300
              rounded-xl
              px-4
              py-3
              outline-none
              focus:border-blue-500
              bg-white
            "
          >
            <option value="">
              All Roles
            </option>

            <option value="candidate">
              Candidates
            </option>

            <option value="recruiter">
              Recruiters
            </option>

            <option value="admin">
              Admins
            </option>
          </select>

        </div>

      </div>

      {/* ======================================================
          USERS TABLE
      ====================================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden">

        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between">

          <div>
            <h2 className="text-lg font-bold text-slate-900">
              All Users
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              {filteredUsers.length} user
              {filteredUsers.length !== 1
                ? "s"
                : ""}{" "}
              found
            </p>
          </div>

        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[900px]">

            <thead className="bg-slate-50">

              <tr className="text-left text-sm text-slate-500">

                <th className="px-6 py-4 font-semibold">
                  User
                </th>

                <th className="px-6 py-4 font-semibold">
                  Role
                </th>

                <th className="px-6 py-4 font-semibold">
                  Status
                </th>

                <th className="px-6 py-4 font-semibold">
                  Joined
                </th>

                <th className="px-6 py-4 font-semibold text-right">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredUsers.length === 0 ? (

                <tr>
                  <td
                    colSpan="5"
                    className="px-6 py-12 text-center text-slate-500"
                  >
                    No users found.
                  </td>
                </tr>

              ) : (

                filteredUsers.map(
                  (user) => {

                    const blocked =
                      isBlocked(user);

                    const processing =
                      processingId ===
                      user._id;

                    return (
                      <tr
                        key={user._id}
                        className="
                          border-t
                          border-slate-100
                          hover:bg-slate-50
                        "
                      >

                        {/* USER */}

                        <td className="px-6 py-4">

                          <div className="flex items-center gap-3">

                            <div className="
                              w-10
                              h-10
                              rounded-full
                              bg-blue-100
                              text-blue-700
                              flex
                              items-center
                              justify-center
                              font-bold
                            ">
                              {(
                                user.name ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>

                              <p className="font-semibold text-slate-900">
                                {user.name ||
                                  "Unnamed User"}
                              </p>

                              <p className="text-sm text-slate-500">
                                {user.email ||
                                  "No email"}
                              </p>

                            </div>

                          </div>

                        </td>

                        {/* ROLE */}

                        <td className="px-6 py-4">

                          <select
                            value={
                              user.role ||
                              "candidate"
                            }
                            disabled={
                              processing
                            }
                            onChange={(event) =>
                              updateRole(
                                user._id,
                                event.target.value
                              )
                            }
                            className="
                              border
                              border-slate-300
                              rounded-lg
                              px-3
                              py-2
                              text-sm
                              bg-white
                              outline-none
                            "
                          >

                            <option value="candidate">
                              Candidate
                            </option>

                            <option value="recruiter">
                              Recruiter
                            </option>

                            <option value="admin">
                              Admin
                            </option>

                          </select>

                        </td>

                        {/* STATUS */}

                        <td className="px-6 py-4">

                          <span
                            className={`
                              inline-flex
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-semibold
                              ${
                                blocked
                                  ? "bg-red-100 text-red-700"
                                  : "bg-green-100 text-green-700"
                              }
                            `}
                          >

                            {blocked
                              ? "Blocked"
                              : "Active"}

                          </span>

                        </td>

                        {/* DATE */}

                        <td className="px-6 py-4 text-sm text-slate-500">

                          {user.createdAt
                            ? new Date(
                                user.createdAt
                              ).toLocaleDateString()
                            : "-"}

                        </td>

                        {/* ACTIONS */}

                        <td className="px-6 py-4">

                          <div className="flex items-center justify-end gap-2">

                            <button
                              type="button"
                              disabled={
                                processing
                              }
                              onClick={() =>
                                updateStatus(
                                  user._id,
                                  blocked
                                    ? "active"
                                    : "blocked"
                                )
                              }
                              className={`
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                text-sm
                                font-medium
                                disabled:opacity-50
                                ${
                                  blocked
                                    ? "bg-green-100 text-green-700 hover:bg-green-200"
                                    : "bg-orange-100 text-orange-700 hover:bg-orange-200"
                                }
                              `}
                            >

                              {blocked ? (
                                <FaCheck />
                              ) : (
                                <FaBan />
                              )}

                              {blocked
                                ? "Activate"
                                : "Block"}

                            </button>

                            <button
                              type="button"
                              disabled={
                                processing
                              }
                              onClick={() =>
                                deleteUser(
                                  user._id
                                )
                              }
                              className="
                                inline-flex
                                items-center
                                gap-2
                                px-3
                                py-2
                                rounded-lg
                                bg-red-100
                                text-red-700
                                hover:bg-red-200
                                text-sm
                                font-medium
                                disabled:opacity-50
                              "
                            >

                              <FaTrash />

                              Delete

                            </button>

                          </div>

                        </td>

                      </tr>
                    );
                  }
                )

              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default Users;