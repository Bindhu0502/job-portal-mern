import { useEffect, useState } from "react";
import api from "../api/api";
import Loader from "../components/common/Loader";

function AdminUsers() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);

    try {
      const response = await api.get("/users");

      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ marginBottom: "30px" }}>
        👥 Manage Users
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr style={{ background: "#2563eb", color: "#fff" }}>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Email</th>
            <th style={thStyle}>Phone</th>
            <th style={thStyle}>Role</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td style={tdStyle}>{user.name}</td>
              <td style={tdStyle}>{user.email}</td>
              <td style={tdStyle}>{user.phone}</td>
              <td style={tdStyle}>{user.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

const tdStyle = {
  padding: "12px",
  border: "1px solid #ddd",
};

export default AdminUsers;