import { NavLink, Outlet } from "react-router-dom";

export default function AppLayout() {
  const navItems = [
    { path: "/", label: "Overview" },
    { path: "/analyze", label: "Analyze Resume" },
    { path: "/rewrite", label: "Rewrite Resume" },
    { path: "/cover-letter", label: "Cover Letter" },
    { path: "/history", label: "History" },
    { path: "/dashboard", label: "Dashboard" },
  ];

  return (
    <div className="app-shell">
      <aside className="sidebar">
        <div className="sidebar-brand">
          <div className="brand-icon">AR</div>
          <div>
            <h2>AIResume</h2>
            <p>Career assistant</p>
          </div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                isActive ? "sidebar-link active-sidebar-link" : "sidebar-link"
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}