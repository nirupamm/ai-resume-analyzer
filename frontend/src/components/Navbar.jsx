import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ddd" }}>
      <Link to="/">Home</Link>{" | "}
      <Link to="/analyze">Analyze</Link>{" | "}
      <Link to="/rewrite">Rewrite</Link>{" | "}
      <Link to="/cover-letter">Cover Letter</Link>{" | "}
      <Link to="/history">History</Link>{" | "}
      <Link to="/dashboard">Dashboard</Link>
    </nav>
  );
}
