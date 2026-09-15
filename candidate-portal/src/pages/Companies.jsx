import { useEffect, useMemo, useState } from "react";
import api from "../services/api";

import Loader from "../components/ui/Loader";
import CompanySearch from "../components/companies/CompanySearch";
import CompanyList from "../components/companies/CompanyList";

function Companies() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const res = await api.get("/companies");

      setCompanies(res.data.companies || []);
    } catch (err) {
      console.log(err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) =>
      company.name
        ?.toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [companies, search]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-8">
        Companies
      </h1>

      <CompanySearch
        search={search}
        setSearch={setSearch}
      />

      <CompanyList companies={filteredCompanies} />
    </div>
  );
}

export default Companies;