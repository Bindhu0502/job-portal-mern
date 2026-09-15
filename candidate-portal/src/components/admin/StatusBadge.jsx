function StatusBadge({ status }) {
  const getClass = () => {
    switch (status) {
      case "Applied":
        return "status applied";
      case "Reviewed":
        return "status reviewed";
      case "Shortlisted":
        return "status shortlisted";
      case "Rejected":
        return "status rejected";
      case "Hired":
        return "status hired";
      default:
        return "status";
    }
  };

  return <span className={getClass()}>{status}</span>;
}

export default StatusBadge;