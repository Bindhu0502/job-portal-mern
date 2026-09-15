import StatCard from "./StatCard";
import {
  FaUsers,
  FaBriefcase,
  FaBuilding,
  FaFileAlt,
} from "react-icons/fa";

const DashboardCards = () => {
  return (
    <div className="cards-grid">

      <StatCard
        title="Users"
        value="0"
        icon={<FaUsers />}
      />

      <StatCard
        title="Jobs"
        value="0"
        icon={<FaBriefcase />}
      />

      <StatCard
        title="Companies"
        value="0"
        icon={<FaBuilding />}
      />

      <StatCard
        title="Applications"
        value="0"
        icon={<FaFileAlt />}
      />

    </div>
  );
};

export default DashboardCards;