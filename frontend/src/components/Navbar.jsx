import { NavLink } from "react-router-dom";

export default function Navbar() {
  const navItems = [
    { path: "/", label: "Home" },
    { path: "/analyze", label: "Analyze" },
    { path: "/rewrite", label: "Rewrite" },
    { path: "/cover-letter", label: "Cover Letter" },
    { path: "/history", label: "History" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <nav className="navbar">
      <div className="nav-brand">AI Resume Analyzer</div>

      <div className="nav-links">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "nav-link active-link" : "nav-link"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}