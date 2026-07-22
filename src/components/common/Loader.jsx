import { ClipLoader } from "react-spinners";

function Loader() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "70vh",
      }}
    >
      <ClipLoader
        color="#2563eb"
        size={60}
      />
    </div>
  );
}

export default Loader;