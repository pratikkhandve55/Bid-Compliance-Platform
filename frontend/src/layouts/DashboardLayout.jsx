
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Activity,
  Bell,
  ChevronDown,
  ClipboardCheck,
  FileCheck2,
  FileText,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";

const navigation = [
  { label: "Overview", path: "/", icon: LayoutDashboard },
  { label: "Tenders", path: "/tenders", icon: FileText },
  { label: "Bidders", path: "/bidders", icon: Users },
  { label: "AI Verification", path: "/verification", icon: ShieldCheck },
  { label: "Reports", path: "/reports", icon: FileCheck2 },
];

const management = [
  { label: "Audit Trail", path: "/audit", icon: Activity },
  { label: "Settings", path: "/settings", icon: Settings },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [search, setSearch] = useState("");

  function renderLinks(items) {
    return items.map(({ label, path, icon: Icon }) => (
      <NavLink
        key={path}
        to={path}
        end={path === "/"}
        className={({ isActive }) =>
          `nav-link ${isActive ? "active" : ""}`
        }
        onClick={() => setSidebarOpen(false)}
      >
        <Icon size={18} strokeWidth={1.8} />
        <span>{label}</span>
      </NavLink>
    ));
  }

  return (
    <div className="app-shell">
      {sidebarOpen && (
        <button
          className="mobile-backdrop"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside className={`sidebar ${sidebarOpen ? "sidebar-open" : ""}`}>
        <div className="brand">
          <div className="brand-mark">
            <ShieldCheck size={24} />
          </div>
          <div className="brand-copy">
            <strong>BidSure AI</strong>
            <span>PROCUREMENT INTELLIGENCE</span>
          </div>
          <button
            className="icon-button mobile-close"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="workspace-label">WORKSPACE</div>
        <nav className="sidebar-nav">{renderLinks(navigation)}</nav>

        <div className="workspace-label management-label">MANAGEMENT</div>
        <nav className="sidebar-nav">{renderLinks(management)}</nav>

        <div className="sidebar-bottom">
          <div className="support-card">
            <div className="support-icon">
              <ClipboardCheck size={19} />
            </div>
            <strong>Compliance, simplified.</strong>
            <p>One workspace for transparent bid verification.</p>
            <span className="version-tag">DEMO ENVIRONMENT</span>
          </div>

          <div className="sidebar-user">
            <div className="avatar">PO</div>
            <div className="user-copy">
              <strong>Procurement Officer</strong>
              <span>Demo workspace</span>
            </div>
            <ChevronDown size={16} className="muted-icon" />
          </div>
        </div>
      </aside>

      <div className="main-column">
        <header className="topbar">
          <div className="topbar-left">
            <button
              className="icon-button mobile-menu"
              aria-label="Open navigation"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={21} />
            </button>
            <div className="breadcrumb">
              <span>Workspace</span>
              <span className="breadcrumb-divider">/</span>
              <strong>Procurement</strong>
            </div>
          </div>

          <div className="topbar-actions">
            <label className="search-box">
              <Search size={17} />
              <input
                type="search"
                placeholder="Search tenders, bidders..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                aria-label="Search"
              />
              <kbd>⌘ K</kbd>
            </label>

            <button
              className="icon-button notification-button"
              aria-label="Notifications"
              title="Notifications"
              onClick={() => window.alert("No new notifications in this demo.")}
            >
              <Bell size={19} />
              <span className="notification-dot" />
            </button>

            <div className="topbar-profile">
              <div className="avatar">PO</div>
              <div className="topbar-profile-copy">
                <strong>Officer</strong>
                <span>Administrator</span>
              </div>
            </div>
          </div>
        </header>

        <main className="page-content">
          <Outlet context={{ search, setSearch }} />
        </main>

        <footer className="app-footer">
          <span>BidSure AI · Procurement Compliance Platform</span>
          <span>
            <span className="footer-dot" /> Prototype environment
          </span>
        </footer>
      </div>
    </div>
  );
}
