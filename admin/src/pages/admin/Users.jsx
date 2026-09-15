import { useEffect, useMemo, useState } from "react";

import axios from "axios";

import {
  Users as UsersIcon,
  Search,
  RefreshCw,
  Eye,
  Trash2,
  UserCheck,
  UserX,
  ShieldCheck,
  X,
  Save,
  AlertCircle,
} from "lucide-react";


// ============================================================
// API
// ============================================================

const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";


// ============================================================
// USERS PAGE
// ============================================================

function Users() {

  // ==========================================================
  // STATE
  // ==========================================================

  const [users, setUsers] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [refreshing, setRefreshing] =
    useState(false);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [roleFilter, setRoleFilter] =
    useState("all");

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [selectedUser, setSelectedUser] =
    useState(null);

  const [editingUser, setEditingUser] =
    useState(null);

  const [selectedRole, setSelectedRole] =
    useState("");

  const [actionLoading, setActionLoading] =
    useState(false);


  // ==========================================================
  // GET TOKEN
  // ==========================================================

  const getToken = () => {

    return (
      localStorage.getItem(
        "adminToken"
      ) ||
      localStorage.getItem(
        "token"
      )
    );

  };


  // ==========================================================
  // AUTH HEADERS
  // ==========================================================

  const getHeaders = () => {

    const token =
      getToken();

    return token
      ? {
          Authorization:
            `Bearer ${token}`,
        }
      : {};

  };


  // ==========================================================
  // FETCH USERS
  // ==========================================================

  const fetchUsers = async (
    showRefresh = false
  ) => {

    try {

      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");


      const response =
        await axios.get(
          `${API_URL}/admin/users`,
          {
            headers:
              getHeaders(),
          }
        );


      if (
        response.data?.success
      ) {

        setUsers(
          Array.isArray(
            response.data.users
          )
            ? response.data.users
            : []
        );

      } else {

        throw new Error(
          response.data?.message ||
          "Failed to fetch users"
        );

      }

    } catch (err) {

      console.error(
        "FETCH USERS ERROR:",
        err
      );


      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to fetch users"
      );

    } finally {

      setLoading(false);
      setRefreshing(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchUsers();

  }, []);


  // ==========================================================
  // FILTER USERS
  // ==========================================================

  const filteredUsers =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return users.filter(
        (user) => {

          const name =
            String(
              user?.name || ""
            ).toLowerCase();

          const email =
            String(
              user?.email || ""
            ).toLowerCase();

          const role =
            String(
              user?.role || ""
            ).toLowerCase();

          const status =
            String(
              user?.status ||
              user?.accountStatus ||
              ""
            ).toLowerCase();


          const matchesSearch =
            !searchValue ||
            name.includes(
              searchValue
            ) ||
            email.includes(
              searchValue
            ) ||
            role.includes(
              searchValue
            );


          const matchesRole =
            roleFilter === "all" ||
            role ===
              roleFilter.toLowerCase();


          const matchesStatus =
            statusFilter === "all" ||
            status ===
              statusFilter.toLowerCase();


          return (
            matchesSearch &&
            matchesRole &&
            matchesStatus
          );

        }
      );

    }, [
      users,
      search,
      roleFilter,
      statusFilter,
    ]);


  // ==========================================================
  // OPEN USER
  // ==========================================================

  const openUser = async (
    user
  ) => {

    setSelectedUser(user);

  };


  // ==========================================================
  // START ROLE EDIT
  // ==========================================================

  const startRoleEdit = (
    user
  ) => {

    setEditingUser(user);

    setSelectedRole(
      user.role || "candidate"
    );

  };


  // ==========================================================
  // UPDATE ROLE
  // ==========================================================

  const updateRole = async () => {

    if (!editingUser) {
      return;
    }


    try {

      setActionLoading(true);


      const response =
        await axios.put(
          `${API_URL}/admin/users/${editingUser._id}`,
          {
            role:
              selectedRole,
          },
          {
            headers:
              getHeaders(),
          }
        );


      if (
        !response.data?.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to update role"
        );

      }


      const updatedUser =
        response.data.user;


      setUsers(
        (previous) =>
          previous.map(
            (user) =>
              user._id ===
              editingUser._id
                ? {
                    ...user,
                    ...(updatedUser ||
                      {}),
                    role:
                      selectedRole,
                  }
                : user
          )
      );


      if (
        selectedUser?._id ===
        editingUser._id
      ) {

        setSelectedUser(
          (previous) =>
            previous
              ? {
                  ...previous,
                  ...(updatedUser ||
                    {}),
                  role:
                    selectedRole,
                }
              : null
        );

      }


      setEditingUser(null);

    } catch (err) {

      console.error(
        "UPDATE ROLE ERROR:",
        err
      );


      window.alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to update role"
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // UPDATE STATUS
  // ==========================================================

  const updateStatus = async (
    user,
    status
  ) => {

    if (!user?._id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to change ${user.name || "this user"} status to "${status}"?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);


      const response =
        await axios.put(
          `${API_URL}/admin/users/${user._id}/status`,
          {
            status,
          },
          {
            headers:
              getHeaders(),
          }
        );


      if (
        !response.data?.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to update status"
        );

      }


      const updatedUser =
        response.data.user;


      setUsers(
        (previous) =>
          previous.map(
            (item) =>
              item._id ===
              user._id
                ? {
                    ...item,
                    ...(updatedUser ||
                      {}),
                  }
                : item
          )
      );


      if (
        selectedUser?._id ===
        user._id
      ) {

        setSelectedUser(
          (previous) =>
            previous
              ? {
                  ...previous,
                  ...(updatedUser ||
                    {}),
                }
              : null
        );

      }

    } catch (err) {

      console.error(
        "UPDATE STATUS ERROR:",
        err
      );


      window.alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to update user status"
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // DELETE USER
  // ==========================================================

  const deleteUser = async (
    user
  ) => {

    if (!user?._id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Are you sure you want to permanently delete ${user.name || "this user"}?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);


      const response =
        await axios.delete(
          `${API_URL}/admin/users/${user._id}`,
          {
            headers:
              getHeaders(),
          }
        );


      if (
        !response.data?.success
      ) {

        throw new Error(
          response.data?.message ||
          "Failed to delete user"
        );

      }


      setUsers(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !==
              user._id
          )
      );


      if (
        selectedUser?._id ===
        user._id
      ) {

        setSelectedUser(null);

      }

    } catch (err) {

      console.error(
        "DELETE USER ERROR:",
        err
      );


      window.alert(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete user"
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // STATUS
  // ==========================================================

  const getStatus =
    (user) => {

      return (
        user?.status ||
        user?.accountStatus ||
        "active"
      );

    };


  // ==========================================================
  // DATE
  // ==========================================================

  const formatDate = (
    date
  ) => {

    if (!date) {
      return "—";
    }


    const parsed =
      new Date(date);


    if (
      Number.isNaN(
        parsed.getTime()
      )
    ) {

      return "—";

    }


    return parsed.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (
      <div className="
        flex
        min-h-[400px]
        items-center
        justify-center
      ">

        <div className="
          text-center
        ">

          <RefreshCw
            size={30}
            className="
              mx-auto
              animate-spin
              text-blue-600
            "
          />

          <p className="
            mt-3
            text-sm
            text-gray-600
          ">
            Loading users...
          </p>

        </div>

      </div>
    );

  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="
      w-full
      min-w-0
    ">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="
        mb-6
        flex
        flex-col
        gap-4
        sm:flex-row
        sm:items-center
        sm:justify-between
      ">

        <div>

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-blue-50
              text-blue-600
            ">

              <UsersIcon
                size={20}
              />

            </div>


            <div>

              <h1 className="
                text-2xl
                font-bold
                text-gray-900
                sm:text-3xl
              ">
                Users
              </h1>

              <p className="
                mt-1
                text-sm
                text-gray-500
              ">
                Manage candidates, recruiters and administrators.
              </p>

            </div>

          </div>

        </div>


        <button
          type="button"
          onClick={() =>
            fetchUsers(true)
          }
          disabled={refreshing}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
            self-start
            rounded-lg
            border
            border-gray-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-gray-700
            hover:bg-gray-50
            disabled:cursor-not-allowed
            disabled:opacity-60
            sm:self-auto
          "
        >

          <RefreshCw
            size={16}
            className={
              refreshing
                ? "animate-spin"
                : ""
            }
          />

          Refresh

        </button>

      </div>


      {/* ======================================================
          ERROR
          ====================================================== */}

      {error && (

        <div className="
          mb-5
          flex
          items-start
          gap-3
          rounded-xl
          border
          border-red-200
          bg-red-50
          p-4
        ">

          <AlertCircle
            size={19}
            className="
              shrink-0
              text-red-600
            "
          />

          <div>

            <p className="
              text-sm
              font-semibold
              text-red-800
            ">
              Failed to load users
            </p>

            <p className="
              mt-1
              text-xs
              text-red-700
            ">
              {error}
            </p>

          </div>

        </div>

      )}


      {/* ======================================================
          SUMMARY
          ====================================================== */}

      <div className="
        mb-5
        grid
        grid-cols-2
        gap-3
        sm:grid-cols-4
      ">

        <SummaryCard
          title="Total"
          value={users.length}
        />

        <SummaryCard
          title="Candidates"
          value={
            users.filter(
              (user) =>
                user.role ===
                "candidate"
            ).length
          }
        />

        <SummaryCard
          title="Recruiters"
          value={
            users.filter(
              (user) =>
                user.role ===
                "recruiter"
            ).length
          }
        />

        <SummaryCard
          title="Admins"
          value={
            users.filter(
              (user) =>
                user.role ===
                "admin"
            ).length
          }
        />

      </div>


      {/* ======================================================
          FILTERS
          ====================================================== */}

      <div className="
        mb-5
        rounded-xl
        border
        border-gray-200
        bg-white
        p-4
      ">

        <div className="
          grid
          grid-cols-1
          gap-3
          md:grid-cols-3
        ">

          {/* SEARCH */}

          <div className="
            relative
            min-w-0
            md:col-span-1
          ">

            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-gray-400
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
              placeholder="Search users..."
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                py-2.5
                pl-10
                pr-4
                text-sm
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            />

          </div>


          {/* ROLE */}

          <select
            value={roleFilter}
            onChange={(event) =>
              setRoleFilter(
                event.target.value
              )
            }
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              focus:border-blue-500
            "
          >

            <option value="all">
              All Roles
            </option>

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


          {/* STATUS */}

          <select
            value={statusFilter}
            onChange={(event) =>
              setStatusFilter(
                event.target.value
              )
            }
            className="
              rounded-lg
              border
              border-gray-200
              bg-white
              px-4
              py-2.5
              text-sm
              text-gray-700
              outline-none
              focus:border-blue-500
            "
          >

            <option value="all">
              All Statuses
            </option>

            <option value="active">
              Active
            </option>

            <option value="blocked">
              Blocked
            </option>

            <option value="pending">
              Pending
            </option>

            <option value="approved">
              Approved
            </option>

            <option value="rejected">
              Rejected
            </option>

          </select>

        </div>

      </div>


      {/* ======================================================
          USER TABLE
          ====================================================== */}

      <div className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
      ">

        {filteredUsers.length === 0 ? (

          <div className="
            flex
            min-h-[300px]
            flex-col
            items-center
            justify-center
            px-6
            text-center
          ">

            <div className="
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-full
              bg-gray-100
              text-gray-500
            ">

              <UsersIcon
                size={22}
              />

            </div>

            <p className="
              mt-3
              text-sm
              font-semibold
              text-gray-900
            ">
              No users found
            </p>

            <p className="
              mt-1
              text-xs
              text-gray-500
            ">
              Try changing your search or filters.
            </p>

          </div>

        ) : (

          <div className="
            overflow-x-auto
          ">

            <table className="
              w-full
              min-w-[900px]
            ">

              <thead>

                <tr className="
                  border-b
                  border-gray-200
                  bg-gray-50
                ">

                  <th className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    User
                  </th>

                  <th className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    Role
                  </th>

                  <th className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    Status
                  </th>

                  <th className="
                    px-4
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    Joined
                  </th>

                  <th className="
                    px-4
                    py-3
                    text-right
                    text-xs
                    font-semibold
                    text-gray-500
                  ">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredUsers.map(
                  (user) => {

                    const status =
                      getStatus(user);


                    return (

                      <tr
                        key={user._id}
                        className="
                          border-b
                          border-gray-100
                          last:border-0
                          hover:bg-gray-50
                        "
                      >

                        {/* USER */}

                        <td className="
                          px-4
                          py-4
                        ">

                          <div className="
                            flex
                            min-w-0
                            items-center
                            gap-3
                          ">

                            <div className="
                              flex
                              h-10
                              w-10
                              shrink-0
                              items-center
                              justify-center
                              rounded-full
                              bg-blue-50
                              text-sm
                              font-bold
                              text-blue-600
                            ">

                              {String(
                                user.name ||
                                "U"
                              )
                                .charAt(0)
                                .toUpperCase()}

                            </div>


                            <div className="
                              min-w-0
                            ">

                              <p className="
                                truncate
                                text-sm
                                font-semibold
                                text-gray-900
                              ">
                                {user.name ||
                                  "Unknown User"}
                              </p>

                              <p className="
                                mt-0.5
                                truncate
                                text-xs
                                text-gray-500
                              ">
                                {user.email ||
                                  "No email"}
                              </p>

                            </div>

                          </div>

                        </td>


                        {/* ROLE */}

                        <td className="
                          px-4
                          py-4
                        ">

                          <span className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-full
                            bg-gray-100
                            px-3
                            py-1.5
                            text-xs
                            font-semibold
                            capitalize
                            text-gray-700
                          ">

                            {user.role ===
                              "admin" && (
                              <ShieldCheck
                                size={13}
                              />
                            )}

                            {user.role ||
                              "candidate"}

                          </span>

                        </td>


                        {/* STATUS */}

                        <td className="
                          px-4
                          py-4
                        ">

                          <StatusBadge
                            status={status}
                          />

                        </td>


                        {/* DATE */}

                        <td className="
                          whitespace-nowrap
                          px-4
                          py-4
                          text-xs
                          text-gray-500
                        ">

                          {formatDate(
                            user.createdAt
                          )}

                        </td>


                        {/* ACTIONS */}

                        <td className="
                          px-4
                          py-4
                        ">

                          <div className="
                            flex
                            items-center
                            justify-end
                            gap-1
                          ">

                            <ActionButton
                              title="View"
                              onClick={() =>
                                openUser(
                                  user
                                )
                              }
                            >
                              <Eye
                                size={16}
                              />
                            </ActionButton>


                            <ActionButton
                              title="Change role"
                              onClick={() =>
                                startRoleEdit(
                                  user
                                )
                              }
                            >
                              <ShieldCheck
                                size={16}
                              />
                            </ActionButton>


                            {status ===
                            "blocked" ? (

                              <ActionButton
                                title="Activate"
                                onClick={() =>
                                  updateStatus(
                                    user,
                                    "active"
                                  )
                                }
                              >
                                <UserCheck
                                  size={16}
                                />
                              </ActionButton>

                            ) : (

                              <ActionButton
                                title="Block"
                                onClick={() =>
                                  updateStatus(
                                    user,
                                    "blocked"
                                  )
                                }
                              >
                                <UserX
                                  size={16}
                                />
                              </ActionButton>

                            )}


                            <ActionButton
                              title="Delete"
                              danger
                              onClick={() =>
                                deleteUser(
                                  user
                                )
                              }
                            >
                              <Trash2
                                size={16}
                              />
                            </ActionButton>

                          </div>

                        </td>

                      </tr>

                    );

                  }
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================================
          VIEW USER MODAL
          ====================================================== */}

      {selectedUser && (

        <Modal
          onClose={() =>
            setSelectedUser(
              null
            )
          }
        >

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            ">

              <UsersIcon
                size={20}
              />

            </div>


            <div>

              <h2 className="
                text-lg
                font-bold
                text-gray-900
              ">
                User Details
              </h2>

              <p className="
                text-xs
                text-gray-500
              ">
                View account information
              </p>

            </div>

          </div>


          <div className="
            mt-6
            space-y-4
          ">

            <DetailRow
              label="Name"
              value={
                selectedUser.name
              }
            />

            <DetailRow
              label="Email"
              value={
                selectedUser.email
              }
            />

            <DetailRow
              label="Role"
              value={
                selectedUser.role
              }
            />

            <DetailRow
              label="Status"
              value={
                getStatus(
                  selectedUser
                )
              }
            />

            <DetailRow
              label="Joined"
              value={
                formatDate(
                  selectedUser.createdAt
                )
              }
            />

          </div>


          <div className="
            mt-6
            flex
            justify-end
          ">

            <button
              type="button"
              onClick={() =>
                setSelectedUser(
                  null
                )
              }
              className="
                rounded-lg
                bg-gray-900
                px-4
                py-2.5
                text-sm
                font-medium
                text-white
                hover:bg-gray-800
              "
            >
              Close
            </button>

          </div>

        </Modal>

      )}


      {/* ======================================================
          EDIT ROLE MODAL
          ====================================================== */}

      {editingUser && (

        <Modal
          onClose={() => {

            if (!actionLoading) {
              setEditingUser(
                null
              );
            }

          }}
        >

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-xl
              bg-blue-50
              text-blue-600
            ">

              <ShieldCheck
                size={20}
              />

            </div>


            <div>

              <h2 className="
                text-lg
                font-bold
                text-gray-900
              ">
                Change User Role
              </h2>

              <p className="
                text-xs
                text-gray-500
              ">
                {editingUser.name ||
                  editingUser.email}
              </p>

            </div>

          </div>


          <div className="
            mt-6
          ">

            <label className="
              mb-2
              block
              text-sm
              font-semibold
              text-gray-700
            ">
              Select Role
            </label>

            <select
              value={selectedRole}
              onChange={(event) =>
                setSelectedRole(
                  event.target.value
                )
              }
              disabled={
                actionLoading
              }
              className="
                w-full
                rounded-lg
                border
                border-gray-200
                bg-white
                px-4
                py-3
                text-sm
                outline-none
                focus:border-blue-500
                focus:ring-2
                focus:ring-blue-100
              "
            >

              <option value="candidate">
                Candidate
              </option>

              <option value="recruiter">
                Recruiter
              </option>

              <option value="admin">
                Administrator
              </option>

            </select>

          </div>


          <div className="
            mt-6
            flex
            justify-end
            gap-2
          ">

            <button
              type="button"
              disabled={
                actionLoading
              }
              onClick={() =>
                setEditingUser(
                  null
                )
              }
              className="
                rounded-lg
                border
                border-gray-200
                px-4
                py-2.5
                text-sm
                font-medium
                text-gray-700
                hover:bg-gray-50
                disabled:opacity-50
              "
            >
              Cancel
            </button>


            <button
              type="button"
              disabled={
                actionLoading
              }
              onClick={
                updateRole
              }
              className="
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-blue-600
                px-4
                py-2.5
                text-sm
                font-semibold
                text-white
                hover:bg-blue-700
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >

              {actionLoading ? (

                <RefreshCw
                  size={16}
                  className="
                    animate-spin
                  "
                />

              ) : (

                <Save
                  size={16}
                />

              )}

              Save Role

            </button>

          </div>

        </Modal>

      )}

    </div>
  );
}


// ============================================================
// SUMMARY CARD
// ============================================================

function SummaryCard({
  title,
  value,
}) {

  return (
    <div className="
      rounded-xl
      border
      border-gray-200
      bg-white
      p-4
    ">

      <p className="
        text-xs
        font-medium
        text-gray-500
      ">
        {title}
      </p>

      <p className="
        mt-1
        text-xl
        font-bold
        text-gray-900
      ">
        {Number(
          value || 0
        ).toLocaleString(
          "en-IN"
        )}
      </p>

    </div>
  );
}


// ============================================================
// STATUS BADGE
// ============================================================

function StatusBadge({
  status,
}) {

  const styles = {

    active:
      "bg-green-50 text-green-700",

    blocked:
      "bg-red-50 text-red-700",

    pending:
      "bg-yellow-50 text-yellow-700",

    approved:
      "bg-green-50 text-green-700",

    rejected:
      "bg-red-50 text-red-700",

  };


  return (
    <span className={`
      inline-flex
      rounded-full
      px-3
      py-1.5
      text-xs
      font-semibold
      capitalize
      ${
        styles[
          String(
            status
          ).toLowerCase()
        ]
        ||
        "bg-gray-100 text-gray-600"
      }
    `}>
      {status || "Unknown"}
    </span>
  );
}


// ============================================================
// ACTION BUTTON
// ============================================================

function ActionButton({
  children,
  onClick,
  title,
  danger = false,
}) {

  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`
        rounded-lg
        p-2
        transition
        ${
          danger
            ? "text-red-600 hover:bg-red-50"
            : "text-gray-500 hover:bg-gray-100 hover:text-gray-800"
        }
      `}
    >
      {children}
    </button>
  );
}


// ============================================================
// DETAIL ROW
// ============================================================

function DetailRow({
  label,
  value,
}) {

  return (
    <div className="
      rounded-lg
      border
      border-gray-100
      bg-gray-50
      p-4
    ">

      <p className="
        text-xs
        font-semibold
        text-gray-500
      ">
        {label}
      </p>

      <p className="
        mt-1
        break-words
        text-sm
        font-medium
        capitalize
        text-gray-900
      ">
        {value || "—"}
      </p>

    </div>
  );
}


// ============================================================
// MODAL
// ============================================================

function Modal({
  children,
  onClose,
}) {

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        flex
        items-center
        justify-center
        overflow-y-auto
        bg-black/50
        p-4
      "
      onMouseDown={(event) => {

        if (
          event.target ===
          event.currentTarget
        ) {

          onClose();

        }

      }}
    >

      <div className="
        max-h-[90vh]
        w-full
        max-w-lg
        overflow-y-auto
        rounded-2xl
        bg-white
        p-5
        shadow-2xl
        sm:p-6
      ">

        <div className="
          flex
          justify-end
        ">

          <button
            type="button"
            onClick={onClose}
            className="
              -mt-2
              -mr-2
              rounded-lg
              p-2
              text-gray-500
              hover:bg-gray-100
            "
          >

            <X size={19} />

          </button>

        </div>


        {children}

      </div>

    </div>
  );
}


export default Users;