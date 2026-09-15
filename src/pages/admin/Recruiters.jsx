import { useEffect, useMemo, useState } from "react";

import {
  FaSearch,
  FaUserTie,
  FaBuilding,
  FaCheckCircle,
  FaBan,
  FaTrash,
  FaEye,
  FaTimes,
} from "react-icons/fa";

import { toast } from "react-hot-toast";

import api from "../../services/api";


function Recruiters() {

  // ============================================================
  // STATE
  // ============================================================

  const [recruiters, setRecruiters] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("");

  const [selectedRecruiter, setSelectedRecruiter] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);


  // ============================================================
  // FETCH RECRUITERS
  // ============================================================

  useEffect(() => {

    fetchRecruiters();

  }, []);


  const fetchRecruiters = async () => {

    try {

      setLoading(true);

      const response = await api.get(
        "/admin/recruiters"
      );

      console.log(
        "ADMIN RECRUITERS RESPONSE:",
        response.data
      );

      const recruiterData =
        response.data?.recruiters;

      setRecruiters(
        Array.isArray(recruiterData)
          ? recruiterData
          : []
      );

    } catch (error) {

      console.error(
        "FETCH RECRUITERS ERROR:",
        error.response?.data || error
      );

      setRecruiters([]);

      toast.error(
        error.response?.data?.message ||
        "Failed to load recruiters"
      );

    } finally {

      setLoading(false);

    }

  };


  // ============================================================
  // GET STATUS
  // ============================================================

  const getRecruiterStatus = (recruiter) => {

    return (
      recruiter?.accountStatus ||
      recruiter?.status ||
      "approved"
    );

  };


  // ============================================================
  // UPDATE STATUS
  // ============================================================

  const updateStatus = async (
    recruiterId,
    status
  ) => {

    if (!recruiterId) {
      return;
    }

    try {

      setActionLoading(true);

      await api.put(
        `/admin/recruiters/${recruiterId}/status`,
        {
          status,
        }
      );

      toast.success(
        status === "approved"
          ? "Recruiter approved successfully"
          : "Recruiter blocked successfully"
      );

      await fetchRecruiters();

    } catch (error) {

      console.error(
        "UPDATE RECRUITER STATUS ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Unable to update recruiter status"
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ============================================================
  // DELETE RECRUITER
  // ============================================================

  const deleteRecruiter = async (
    recruiterId
  ) => {

    if (!recruiterId) {
      return;
    }


    const confirmed = window.confirm(
      "Are you sure you want to delete this recruiter?"
    );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);

      await api.delete(
        `/admin/recruiters/${recruiterId}`
      );

      setRecruiters(
        (previous) =>
          previous.filter(
            (recruiter) =>
              recruiter._id !== recruiterId
          )
      );

      setSelectedRecruiter(null);

      toast.success(
        "Recruiter deleted successfully"
      );

    } catch (error) {

      console.error(
        "DELETE RECRUITER ERROR:",
        error.response?.data || error
      );

      toast.error(
        error.response?.data?.message ||
        "Unable to delete recruiter"
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ============================================================
  // FILTER RECRUITERS
  // ============================================================

  const filteredRecruiters = useMemo(() => {

    const searchValue =
      search.trim().toLowerCase();


    return recruiters.filter(
      (recruiter) => {

        const name =
          String(
            recruiter?.name || ""
          ).toLowerCase();

        const email =
          String(
            recruiter?.email || ""
          ).toLowerCase();

        const company =
          String(
            recruiter?.company || ""
          ).toLowerCase();


        const status =
          getRecruiterStatus(
            recruiter
          );


        const matchesSearch =
          !searchValue ||
          name.includes(searchValue) ||
          email.includes(searchValue) ||
          company.includes(searchValue);


        const matchesStatus =
          !statusFilter ||
          status === statusFilter;


        return (
          matchesSearch &&
          matchesStatus
        );

      }
    );

  }, [
    recruiters,
    search,
    statusFilter,
  ]);


  // ============================================================
  // STATISTICS
  // ============================================================

  const totalRecruiters =
    recruiters.length;


  const approvedRecruiters =
    recruiters.filter(
      (recruiter) =>
        getRecruiterStatus(
          recruiter
        ) === "approved"
    ).length;


  const pendingRecruiters =
    recruiters.filter(
      (recruiter) =>
        getRecruiterStatus(
          recruiter
        ) === "pending"
    ).length;


  const blockedRecruiters =
    recruiters.filter(
      (recruiter) =>
        getRecruiterStatus(
          recruiter
        ) === "blocked"
    ).length;


  // ============================================================
  // STATUS BADGE
  // ============================================================

  const renderStatusBadge = (
    recruiter
  ) => {

    const status =
      getRecruiterStatus(
        recruiter
      );


    if (status === "approved") {

      return (
        <span className="
          inline-flex
          items-center
          gap-1.5
          px-3
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-green-100
          text-green-700
        ">

          <FaCheckCircle />

          Approved

        </span>
      );

    }


    if (status === "blocked") {

      return (
        <span className="
          inline-flex
          items-center
          gap-1.5
          px-3
          py-1.5
          rounded-full
          text-xs
          font-semibold
          bg-red-100
          text-red-700
        ">

          <FaBan />

          Blocked

        </span>
      );

    }


    return (
      <span className="
        inline-flex
        items-center
        gap-1.5
        px-3
        py-1.5
        rounded-full
        text-xs
        font-semibold
        bg-yellow-100
        text-yellow-700
      ">

        <FaCheckCircle />

        Pending

      </span>
    );

  };


  // ============================================================
  // LOADING SCREEN
  // ============================================================

  if (loading) {

    return (

      <div className="
        min-h-[500px]
        flex
        flex-col
        items-center
        justify-center
      ">

        <div className="
          w-12
          h-12
          border-4
          border-blue-200
          border-t-blue-600
          rounded-full
          animate-spin
        " />

        <p className="
          mt-4
          text-slate-500
        ">

          Loading recruiters...

        </p>

      </div>

    );

  }


  // ============================================================
  // MAIN PAGE
  // ============================================================

  return (

    <div className="space-y-6">


      {/* ======================================================
          HEADER
      ====================================================== */}

      <div>

        <div className="
          flex
          items-center
          gap-3
        ">

          <div className="
            w-12
            h-12
            rounded-xl
            bg-purple-100
            text-purple-600
            flex
            items-center
            justify-center
          ">

            <FaUserTie size={21} />

          </div>


          <div>

            <h1 className="
              text-3xl
              font-bold
              text-slate-900
            ">

              Recruiters

            </h1>


            <p className="
              text-slate-500
              mt-1
            ">

              Manage CareerHub recruiter accounts.

            </p>

          </div>

        </div>

      </div>


      {/* ======================================================
          STATISTICS
      ====================================================== */}

      <div className="
        grid
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-4
        gap-4
      ">


        {/* TOTAL */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          p-5
        ">

          <p className="
            text-sm
            text-slate-500
          ">

            Total Recruiters

          </p>


          <h2 className="
            text-3xl
            font-bold
            text-slate-900
            mt-2
          ">

            {totalRecruiters}

          </h2>

        </div>


        {/* APPROVED */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          p-5
        ">

          <p className="
            text-sm
            text-slate-500
          ">

            Approved

          </p>


          <h2 className="
            text-3xl
            font-bold
            text-green-600
            mt-2
          ">

            {approvedRecruiters}

          </h2>

        </div>


        {/* PENDING */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          p-5
        ">

          <p className="
            text-sm
            text-slate-500
          ">

            Pending

          </p>


          <h2 className="
            text-3xl
            font-bold
            text-yellow-600
            mt-2
          ">

            {pendingRecruiters}

          </h2>

        </div>


        {/* BLOCKED */}

        <div className="
          bg-white
          border
          border-slate-200
          rounded-xl
          p-5
        ">

          <p className="
            text-sm
            text-slate-500
          ">

            Blocked

          </p>


          <h2 className="
            text-3xl
            font-bold
            text-red-600
            mt-2
          ">

            {blockedRecruiters}

          </h2>

        </div>

      </div>


      {/* ======================================================
          FILTERS
      ====================================================== */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-xl
        p-5
        flex
        flex-col
        md:flex-row
        gap-4
      ">


        {/* SEARCH */}

        <div className="
          flex
          items-center
          bg-slate-100
          rounded-lg
          px-4
          flex-1
        ">

          <FaSearch className="
            text-slate-400
          " />


          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Search name, email or company..."
            className="
              bg-transparent
              outline-none
              px-3
              py-3
              w-full
              text-sm
              text-slate-700
            "
          />

        </div>


        {/* STATUS */}

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(
              event.target.value
            )
          }
          className="
            border
            border-slate-300
            rounded-lg
            px-4
            py-3
            outline-none
            bg-white
            text-sm
            text-slate-700
          "
        >

          <option value="">
            All Status
          </option>

          <option value="approved">
            Approved
          </option>

          <option value="pending">
            Pending
          </option>

          <option value="blocked">
            Blocked
          </option>

        </select>

      </div>


      {/* ======================================================
          TABLE
      ====================================================== */}

      <div className="
        bg-white
        border
        border-slate-200
        rounded-xl
        shadow-sm
        overflow-x-auto
      ">

        <table className="
          w-full
          min-w-[900px]
        ">

          <thead className="
            bg-slate-50
            border-b
            border-slate-200
          ">

            <tr>

              <th className="
                p-4
                text-left
                text-sm
                font-semibold
                text-slate-600
              ">

                Recruiter

              </th>


              <th className="
                p-4
                text-left
                text-sm
                font-semibold
                text-slate-600
              ">

                Company

              </th>


              <th className="
                p-4
                text-left
                text-sm
                font-semibold
                text-slate-600
              ">

                Status

              </th>


              <th className="
                p-4
                text-left
                text-sm
                font-semibold
                text-slate-600
              ">

                Joined

              </th>


              <th className="
                p-4
                text-center
                text-sm
                font-semibold
                text-slate-600
              ">

                Actions

              </th>

            </tr>

          </thead>


          <tbody>

            {filteredRecruiters.length === 0 ? (

              <tr>

                <td
                  colSpan="5"
                  className="
                    p-12
                    text-center
                    text-slate-500
                  "
                >

                  <FaUserTie className="
                    mx-auto
                    text-4xl
                    text-slate-300
                    mb-3
                  " />

                  <p>
                    No recruiters found.
                  </p>

                </td>

              </tr>

            ) : (

              filteredRecruiters.map(
                (recruiter) => {

                  const status =
                    getRecruiterStatus(
                      recruiter
                    );


                  return (

                    <tr
                      key={recruiter._id}
                      className="
                        border-b
                        border-slate-100
                        hover:bg-slate-50
                      "
                    >


                      {/* RECRUITER */}

                      <td className="p-4">

                        <div className="
                          flex
                          items-center
                          gap-3
                        ">

                          <div className="
                            w-10
                            h-10
                            rounded-full
                            bg-purple-100
                            text-purple-700
                            flex
                            items-center
                            justify-center
                            font-bold
                          ">

                            {(
                              recruiter.name ||
                              "R"
                            )
                              .charAt(0)
                              .toUpperCase()}

                          </div>


                          <div>

                            <p className="
                              font-semibold
                              text-slate-800
                            ">

                              {recruiter.name ||
                                "Recruiter"}

                            </p>


                            <p className="
                              text-xs
                              text-slate-500
                            ">

                              {recruiter.email ||
                                "Email unavailable"}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* COMPANY */}

                      <td className="p-4">

                        <div className="
                          flex
                          items-center
                          gap-2
                          text-slate-700
                        ">

                          <FaBuilding className="
                            text-slate-400
                          " />

                          {recruiter.company ||
                            "Company not added"}

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="p-4">

                        {renderStatusBadge(
                          recruiter
                        )}

                      </td>


                      {/* JOINED */}

                      <td className="
                        p-4
                        text-sm
                        text-slate-500
                      ">

                        {recruiter.createdAt
                          ? new Date(
                              recruiter.createdAt
                            ).toLocaleDateString()
                          : "-"
                        }

                      </td>


                      {/* ACTIONS */}

                      <td className="p-4">

                        <div className="
                          flex
                          items-center
                          justify-center
                          gap-2
                        ">


                          {/* APPROVE */}

                          {status !== "approved" && (

                            <button
                              type="button"
                              title="Approve recruiter"
                              disabled={actionLoading}
                              onClick={() =>
                                updateStatus(
                                  recruiter._id,
                                  "approved"
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-lg
                                bg-green-100
                                text-green-700
                                hover:bg-green-200
                                disabled:opacity-50
                                flex
                                items-center
                                justify-center
                              "
                            >

                              <FaCheckCircle />

                            </button>

                          )}


                          {/* BLOCK */}

                          {status !== "blocked" && (

                            <button
                              type="button"
                              title="Block recruiter"
                              disabled={actionLoading}
                              onClick={() =>
                                updateStatus(
                                  recruiter._id,
                                  "blocked"
                                )
                              }
                              className="
                                w-9
                                h-9
                                rounded-lg
                                bg-red-100
                                text-red-700
                                hover:bg-red-200
                                disabled:opacity-50
                                flex
                                items-center
                                justify-center
                              "
                            >

                              <FaBan />

                            </button>

                          )}


                          {/* VIEW */}

                          <button
                            type="button"
                            title="View recruiter"
                            onClick={() =>
                              setSelectedRecruiter(
                                recruiter
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              bg-blue-100
                              text-blue-700
                              hover:bg-blue-200
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <FaEye />

                          </button>


                          {/* DELETE */}

                          <button
                            type="button"
                            title="Delete recruiter"
                            disabled={actionLoading}
                            onClick={() =>
                              deleteRecruiter(
                                recruiter._id
                              )
                            }
                            className="
                              w-9
                              h-9
                              rounded-lg
                              bg-red-600
                              text-white
                              hover:bg-red-700
                              disabled:opacity-50
                              flex
                              items-center
                              justify-center
                            "
                          >

                            <FaTrash />

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


      {/* ======================================================
          VIEW RECRUITER MODAL
      ====================================================== */}

      {selectedRecruiter && (

        <div className="
          fixed
          inset-0
          z-[100]
          bg-black/40
          flex
          items-center
          justify-center
          p-4
        ">

          <div className="
            w-full
            max-w-lg
            bg-white
            rounded-2xl
            shadow-xl
            overflow-hidden
          ">


            {/* MODAL HEADER */}

            <div className="
              px-6
              py-5
              border-b
              border-slate-200
              flex
              items-center
              justify-between
            ">

              <div>

                <h2 className="
                  text-xl
                  font-bold
                  text-slate-900
                ">

                  Recruiter Details

                </h2>

                <p className="
                  text-sm
                  text-slate-500
                  mt-1
                ">

                  CareerHub recruiter information

                </p>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedRecruiter(null)
                }
                className="
                  w-9
                  h-9
                  rounded-lg
                  bg-slate-100
                  text-slate-600
                  hover:bg-slate-200
                  flex
                  items-center
                  justify-center
                "
              >

                <FaTimes />

              </button>

            </div>


            {/* MODAL BODY */}

            <div className="
              p-6
              space-y-5
            ">


              {/* PROFILE */}

              <div className="
                flex
                items-center
                gap-4
              ">

                <div className="
                  w-14
                  h-14
                  rounded-full
                  bg-purple-100
                  text-purple-700
                  flex
                  items-center
                  justify-center
                  text-xl
                  font-bold
                ">

                  {(
                    selectedRecruiter.name ||
                    "R"
                  )
                    .charAt(0)
                    .toUpperCase()}

                </div>


                <div>

                  <h3 className="
                    text-lg
                    font-bold
                    text-slate-900
                  ">

                    {selectedRecruiter.name ||
                      "Recruiter"}

                  </h3>


                  <p className="
                    text-sm
                    text-slate-500
                  ">

                    {selectedRecruiter.email ||
                      "Email unavailable"}

                  </p>

                </div>

              </div>


              {/* DETAILS */}

              <div className="
                grid
                grid-cols-1
                sm:grid-cols-2
                gap-4
              ">


                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-slate-500
                  ">

                    Company

                  </p>

                  <p className="
                    font-semibold
                    text-slate-800
                    mt-1
                  ">

                    {selectedRecruiter.company ||
                      "Not added"}

                  </p>

                </div>


                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-slate-500
                  ">

                    Status

                  </p>

                  <div className="mt-2">

                    {renderStatusBadge(
                      selectedRecruiter
                    )}

                  </div>

                </div>


                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-slate-500
                  ">

                    Joined

                  </p>

                  <p className="
                    font-semibold
                    text-slate-800
                    mt-1
                  ">

                    {selectedRecruiter.createdAt
                      ? new Date(
                          selectedRecruiter.createdAt
                        ).toLocaleDateString()
                      : "-"
                    }

                  </p>

                </div>


                <div className="
                  bg-slate-50
                  rounded-xl
                  p-4
                ">

                  <p className="
                    text-xs
                    text-slate-500
                  ">

                    Role

                  </p>

                  <p className="
                    font-semibold
                    text-slate-800
                    mt-1
                    capitalize
                  ">

                    {selectedRecruiter.role ||
                      "recruiter"}

                  </p>

                </div>

              </div>

            </div>


            {/* MODAL FOOTER */}

            <div className="
              px-6
              py-4
              border-t
              border-slate-200
              flex
              justify-end
            ">

              <button
                type="button"
                onClick={() =>
                  setSelectedRecruiter(null)
                }
                className="
                  px-5
                  py-2.5
                  rounded-lg
                  bg-slate-900
                  text-white
                  hover:bg-slate-800
                  font-medium
                "
              >

                Close

              </button>

            </div>

          </div>

        </div>

      )}

    </div>

  );

}


export default Recruiters;