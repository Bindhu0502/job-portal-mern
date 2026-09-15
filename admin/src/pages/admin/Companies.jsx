import { useEffect, useMemo, useState } from "react";

import {
  Search,
  RefreshCw,
  Eye,
  Trash2,
  X,
  Building2,
  MapPin,
  Globe,
  CalendarDays,
  Mail,
  Phone,
} from "lucide-react";

import api from "../../services/api";


// ============================================================
// ADMIN COMPANIES
// ============================================================

function Companies() {

  const [companies, setCompanies] = useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [search, setSearch] =
    useState("");

  const [selectedCompany, setSelectedCompany] =
    useState(null);

  const [actionLoading, setActionLoading] =
    useState(false);


  // ==========================================================
  // FETCH COMPANIES
  // ==========================================================

  const fetchCompanies = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await api.get(
          "/admin/companies"
        );

      const data =
        response.data;

      setCompanies(
        Array.isArray(
          data?.companies
        )
          ? data.companies
          : []
      );

    } catch (err) {

      console.error(
        "ADMIN COMPANIES ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to load companies."
      );

    } finally {

      setLoading(false);

    }

  };


  // ==========================================================
  // INITIAL LOAD
  // ==========================================================

  useEffect(() => {

    fetchCompanies();

  }, []);


  // ==========================================================
  // HELPERS
  // ==========================================================

  const getCompanyName = (
    company
  ) => {

    return (
      company?.name ||
      company?.companyName ||
      "Unnamed Company"
    );

  };


  const getLocation = (
    company
  ) => {

    if (
      typeof company?.location ===
      "string"
    ) {

      return company.location;

    }

    return (
      company?.location?.city ||
      company?.location?.name ||
      company?.city ||
      "Not specified"
    );

  };


  const getEmail = (
    company
  ) => {

    return (
      company?.email ||
      company?.contactEmail ||
      company?.recruiter?.email ||
      "—"
    );

  };


  const getWebsite = (
    company
  ) => {

    return (
      company?.website ||
      company?.url ||
      "—"
    );

  };


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
  // SEARCH
  // ==========================================================

  const filteredCompanies =
    useMemo(() => {

      const searchValue =
        search
          .trim()
          .toLowerCase();


      return companies.filter(
        (company) => {

          const name =
            getCompanyName(
              company
            ).toLowerCase();

          const location =
            getLocation(
              company
            ).toLowerCase();

          const email =
            getEmail(
              company
            ).toLowerCase();

          const website =
            getWebsite(
              company
            ).toLowerCase();


          return (
            !searchValue ||
            name.includes(
              searchValue
            ) ||
            location.includes(
              searchValue
            ) ||
            email.includes(
              searchValue
            ) ||
            website.includes(
              searchValue
            )
          );

        }
      );

    }, [
      companies,
      search,
    ]);


  // ==========================================================
  // DELETE COMPANY
  // ==========================================================

  const deleteCompany = async (
    company
  ) => {

    if (!company?._id) {
      return;
    }


    const confirmed =
      window.confirm(
        `Delete "${getCompanyName(
          company
        )}"?`
      );


    if (!confirmed) {
      return;
    }


    try {

      setActionLoading(true);
      setError("");


      await api.delete(
        `/admin/companies/${company._id}`
      );


      setCompanies(
        (previous) =>
          previous.filter(
            (item) =>
              item._id !==
              company._id
          )
      );


      if (
        selectedCompany?._id ===
        company._id
      ) {

        setSelectedCompany(
          null
        );

      }

    } catch (err) {

      console.error(
        "DELETE COMPANY ERROR:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Failed to delete company."
      );

    } finally {

      setActionLoading(false);

    }

  };


  // ==========================================================
  // LOADING
  // ==========================================================

  if (loading) {

    return (

      <div className="w-full">

        <div className="
          flex
          min-h-[400px]
          items-center
          justify-center
        ">

          <div className="
            flex
            items-center
            gap-3
            text-gray-500
          ">

            <RefreshCw
              size={20}
              className="animate-spin"
            />

            <span className="text-sm">
              Loading companies...
            </span>

          </div>

        </div>

      </div>

    );

  }


  // ==========================================================
  // PAGE
  // ==========================================================

  return (

    <div className="w-full">

      {/* ======================================================
          HEADER
          ====================================================== */}

      <div className="
        mb-6
        flex
        flex-col
        gap-4
        lg:flex-row
        lg:items-center
        lg:justify-between
      ">

        <div>

          <h1 className="
            text-2xl
            sm:text-3xl
            font-bold
            text-gray-900
          ">
            Companies
          </h1>

          <p className="
            mt-1
            text-sm
            text-gray-500
          ">
            Manage companies registered on CareerHub.
          </p>

        </div>


        <button
          type="button"
          onClick={fetchCompanies}
          className="
            inline-flex
            items-center
            justify-center
            gap-2
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
          "
        >

          <RefreshCw size={17} />

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
          items-center
          justify-between
          gap-4
          rounded-xl
          border
          border-red-200
          bg-red-50
          px-4
          py-3
          text-sm
          text-red-700
        ">

          <span>
            {error}
          </span>

          <button
            type="button"
            onClick={() =>
              setError("")
            }
            className="
              rounded
              p-1
              hover:bg-red-100
            "
          >

            <X size={16} />

          </button>

        </div>

      )}


      {/* ======================================================
          STAT
          ====================================================== */}

      <div className="
        mb-6
        grid
        grid-cols-1
        gap-4
        sm:grid-cols-2
      ">

        <StatCard
          title="Total Companies"
          value={companies.length}
          icon={Building2}
        />

        <StatCard
          title="Showing"
          value={filteredCompanies.length}
          icon={Search}
        />

      </div>


      {/* ======================================================
          SEARCH
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
          relative
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
            placeholder="
              Search company, location or email...
            "
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

      </div>


      {/* ======================================================
          TABLE
          ====================================================== */}

      <div className="
        overflow-hidden
        rounded-xl
        border
        border-gray-200
        bg-white
      ">

        {filteredCompanies.length === 0 ? (

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

              <Building2 size={22} />

            </div>

            <p className="
              mt-3
              text-sm
              font-semibold
              text-gray-900
            ">
              No companies found
            </p>

            <p className="
              mt-1
              text-xs
              text-gray-500
            ">
              Try changing your search.
            </p>

          </div>

        ) : (

          <div className="
            overflow-x-auto
          ">

            <table className="
              min-w-[900px]
              w-full
            ">

              <thead>

                <tr className="
                  border-b
                  border-gray-200
                  bg-gray-50
                ">

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Company
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Location
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Email
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-left
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Created
                  </th>

                  <th className="
                    px-5
                    py-3
                    text-right
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Actions
                  </th>

                </tr>

              </thead>


              <tbody className="
                divide-y
                divide-gray-100
              ">

                {filteredCompanies.map(
                  (company) => (

                    <tr
                      key={
                        company._id
                      }
                      className="
                        hover:bg-gray-50
                      "
                    >

                      {/* COMPANY */}

                      <td className="
                        px-5
                        py-4
                      ">

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

                            <Building2
                              size={18}
                            />

                          </div>


                          <div className="
                            min-w-0
                          ">

                            <p className="
                              max-w-[220px]
                              truncate
                              text-sm
                              font-semibold
                              text-gray-900
                            ">
                              {getCompanyName(
                                company
                              )}
                            </p>

                            <p className="
                              text-xs
                              text-gray-500
                            ">
                              Company
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* LOCATION */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <MapPin
                            size={16}
                            className="text-gray-400"
                          />

                          <span className="
                            max-w-[180px]
                            truncate
                            text-sm
                            text-gray-600
                          ">
                            {getLocation(
                              company
                            )}
                          </span>

                        </div>

                      </td>


                      {/* EMAIL */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          items-center
                          gap-2
                        ">

                          <Mail
                            size={16}
                            className="text-gray-400"
                          />

                          <span className="
                            max-w-[220px]
                            truncate
                            text-sm
                            text-gray-600
                          ">
                            {getEmail(
                              company
                            )}
                          </span>

                        </div>

                      </td>


                      {/* DATE */}

                      <td className="
                        whitespace-nowrap
                        px-5
                        py-4
                        text-sm
                        text-gray-500
                      ">

                        {formatDate(
                          company.createdAt
                        )}

                      </td>


                      {/* ACTIONS */}

                      <td className="
                        px-5
                        py-4
                      ">

                        <div className="
                          flex
                          justify-end
                          gap-1
                        ">

                          <button
                            type="button"
                            onClick={() =>
                              setSelectedCompany(
                                company
                              )
                            }
                            className="
                              rounded-lg
                              p-2
                              text-gray-500
                              hover:bg-blue-50
                              hover:text-blue-600
                            "
                            title="View company"
                          >

                            <Eye size={17} />

                          </button>


                          <button
                            type="button"
                            disabled={
                              actionLoading
                            }
                            onClick={() =>
                              deleteCompany(
                                company
                              )
                            }
                            className="
                              rounded-lg
                              p-2
                              text-gray-500
                              hover:bg-red-50
                              hover:text-red-600
                              disabled:opacity-50
                            "
                            title="Delete company"
                          >

                            <Trash2
                              size={17}
                            />

                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* ======================================================
          COMPANY DETAILS MODAL
          ====================================================== */}

      {selectedCompany && (

        <div className="
          fixed
          inset-0
          z-[100]
          flex
          items-center
          justify-center
          bg-black/50
          p-4
        ">

          <div className="
            max-h-[90vh]
            w-full
            max-w-2xl
            overflow-y-auto
            rounded-2xl
            bg-white
            shadow-xl
          ">

            {/* HEADER */}

            <div className="
              sticky
              top-0
              z-10
              flex
              items-center
              justify-between
              border-b
              border-gray-200
              bg-white
              px-5
              py-4
            ">

              <div className="
                flex
                items-center
                gap-3
              ">

                <div className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-lg
                  bg-blue-50
                  text-blue-600
                ">

                  <Building2
                    size={19}
                  />

                </div>


                <div>

                  <h2 className="
                    text-lg
                    font-bold
                    text-gray-900
                  ">
                    Company Details
                  </h2>

                  <p className="
                    text-xs
                    text-gray-500
                  ">
                    View registered company information
                  </p>

                </div>

              </div>


              <button
                type="button"
                onClick={() =>
                  setSelectedCompany(
                    null
                  )
                }
                className="
                  rounded-lg
                  p-2
                  text-gray-500
                  hover:bg-gray-100
                "
              >

                <X size={19} />

              </button>

            </div>


            {/* BODY */}

            <div className="
              space-y-6
              p-5
            ">

              <div>

                <h3 className="
                  text-xl
                  font-bold
                  text-gray-900
                ">
                  {getCompanyName(
                    selectedCompany
                  )}
                </h3>

              </div>


              <div className="
                grid
                grid-cols-1
                gap-3
                sm:grid-cols-2
              ">

                <InfoBox
                  icon={Building2}
                  label="Company"
                  value={getCompanyName(
                    selectedCompany
                  )}
                />

                <InfoBox
                  icon={MapPin}
                  label="Location"
                  value={getLocation(
                    selectedCompany
                  )}
                />

                <InfoBox
                  icon={Mail}
                  label="Email"
                  value={getEmail(
                    selectedCompany
                  )}
                />

                <InfoBox
                  icon={CalendarDays}
                  label="Created"
                  value={formatDate(
                    selectedCompany.createdAt
                  )}
                />

              </div>


              <InfoBox
                icon={Globe}
                label="Website"
                value={getWebsite(
                  selectedCompany
                )}
              />


              {selectedCompany.description && (

                <div>

                  <p className="
                    mb-2
                    text-xs
                    font-semibold
                    uppercase
                    tracking-wide
                    text-gray-500
                  ">
                    Description
                  </p>

                  <div className="
                    rounded-xl
                    border
                    border-gray-200
                    bg-gray-50
                    p-4
                  ">

                    <p className="
                      whitespace-pre-wrap
                      text-sm
                      leading-6
                      text-gray-700
                    ">
                      {
                        selectedCompany.description
                      }
                    </p>

                  </div>

                </div>

              )}


              {selectedCompany.phone && (

                <InfoBox
                  icon={Phone}
                  label="Phone"
                  value={
                    selectedCompany.phone
                  }
                />

              )}

            </div>


            {/* FOOTER */}

            <div className="
              flex
              items-center
              justify-between
              border-t
              border-gray-200
              px-5
              py-4
            ">

              <button
                type="button"
                disabled={
                  actionLoading
                }
                onClick={() =>
                  deleteCompany(
                    selectedCompany
                  )
                }
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-red-600
                  hover:bg-red-50
                  disabled:opacity-50
                "
              >

                <Trash2 size={16} />

                Delete

              </button>


              <button
                type="button"
                onClick={() =>
                  setSelectedCompany(
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

          </div>

        </div>

      )}

    </div>

  );

}


// ============================================================
// STAT CARD
// ============================================================

function StatCard({
  title,
  value,
  icon: Icon,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-gray-200
      bg-white
      p-5
    ">

      <div className="
        flex
        items-center
        justify-between
      ">

        <div>

          <p className="
            text-xs
            font-medium
            text-gray-500
          ">
            {title}
          </p>

          <p className="
            mt-1
            text-2xl
            font-bold
            text-gray-900
          ">
            {value}
          </p>

        </div>


        <div className="
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-lg
          bg-blue-50
          text-blue-600
        ">

          <Icon size={20} />

        </div>

      </div>

    </div>

  );

}


// ============================================================
// INFO BOX
// ============================================================

function InfoBox({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="
      rounded-xl
      border
      border-gray-200
      bg-gray-50
      p-4
    ">

      <div className="
        flex
        items-center
        gap-2
      ">

        <Icon
          size={16}
          className="text-blue-600"
        />

        <span className="
          text-xs
          font-medium
          text-gray-500
        ">
          {label}
        </span>

      </div>


      <p className="
        mt-2
        break-words
        text-sm
        font-semibold
        text-gray-900
      ">
        {value || "—"}
      </p>

    </div>

  );

}


export default Companies;