import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={styles.nav}>
      <h2 style={{ cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
        💰 Expense Manager
      </h2>

      <div>
        <button onClick={() => navigate("/dashboard")}>Dashboard</button>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
}

const styles = {
  nav: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    alignItems: "center"
  }
};