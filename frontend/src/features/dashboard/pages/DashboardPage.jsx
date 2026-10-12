
import { useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  Clock3,
  FileCheck2,
  FileText,
  Plus,
  ShieldAlert,
  ShieldCheck,
  Users,
} from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const tenders = [
  {
    id: "GEM/2026/1042",
    title: "Supply of Desktop Computers",
    buyer: "Government Engineering College",
    sector: "Electronics & IT",
    bids: 12,
    verified: 9,
    date: "14 Oct 2026",
    status: "Under review",
  },
  {
    id: "GEM/2026/1038",
    title: "Patient Monitoring Equipment",
    buyer: "District General Hospital",
    sector: "Healthcare",
    bids: 8,
    verified: 8,
    date: "15 Oct 2026",
    status: "Review pending",
  },
  {
    id: "GEM/2026/1029",
    title: "Road Resurfacing Works",
    buyer: "Municipal Infrastructure Division",
    sector: "Civil Works",
    bids: 6,
    verified: 3,
    date: "17 Oct 2026",
    status: "Under review",
  },
  {
    id: "GEM/2026/1021",
    title: "Network Switches & Accessories",
    buyer: "Public Sector Office",
    sector: "Electronics & IT",
    bids: 10,
    verified: 10,
    date: "18 Oct 2026",
    status: "Completed",
  },
];

const verifications = [
  {
    initials: "AT",
    bidder: "Apex Technologies Pvt. Ltd.",
    tender: "GEM/2026/1042",
    sector: "Electronics & IT",
    score: 92,
    status: "Verified",
    time: "12 min ago",
  },
  {
    initials: "MM",
    bidder: "Medline Medical Systems",
    tender: "GEM/2026/1038",
    sector: "Healthcare",
    score: 76,
    status: "Needs review",
    time: "28 min ago",
  },
  {
    initials: "IC",
    bidder: "InfraBuild Contractors",
    tender: "GEM/2026/1029",
    sector: "Civil Works",
    score: 58,
    status: "Action required",
    time: "46 min ago",
  },
  {
    initials: "DT",
    bidder: "DigitalTech Solutions",
    tender: "GEM/2026/1021",
    sector: "Electronics & IT",
    score: 97,
    status: "Verified",
    time: "1 hr ago",
  },
];

const sectors = ["All sectors", "Electronics & IT", "Healthcare", "Civil Works"];

const distribution = [
  { name: "Verified", value: 64, color: "#16845b" },
  { name: "Needs review", value: 23, color: "#d99120" },
  { name: "Action required", value: 13, color: "#dc5656" },
];

function StatusBadge({ status }) {
  const className = {
    "Verified": "status-success",
    "Completed": "status-success",
    "Under review": "status-info",
    "Review pending": "status-warning",
    "Needs review": "status-warning",
    "Action required": "status-danger",
  }[status] || "status-neutral";

  return <span className={`status-badge ${className}`}>{status}</span>;
}

function MetricCard({ label, value, change, description, icon: Icon, tone }) {
  const positive = change.startsWith("+");

  return (
    <article className="metric-card">
      <div className="metric-card-top">
        <span className={`metric-icon ${tone}`}>
          <Icon size={20} strokeWidth={1.8} />
        </span>
        <span className={`metric-change ${positive ? "positive" : "negative"}`}>
          {positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {change}
        </span>
      </div>
      <p className="metric-label">{label}</p>
      <div className="metric-value">{value}</div>
      <p className="metric-description">{description}</p>
    </article>
  );
}

export default function DashboardPage() {
  const { search = "" } = useOutletContext() || {};
  const [sector, setSector] = useState("All sectors");
  const [period, setPeriod] = useState("Last 30 days");

  const filteredTenders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return tenders.filter((tender) => {
      const matchesSector =
        sector === "All sectors" || tender.sector === sector;

      const matchesSearch =
        !query ||
        [tender.id, tender.title, tender.buyer, tender.sector]
          .some((value) => value.toLowerCase().includes(query));

      return matchesSector && matchesSearch;
    });
  }, [sector, search]);

  const filteredVerifications = useMemo(() => {
    const query = search.trim().toLowerCase();

    return verifications.filter((item) => {
      const matchesSector =
        sector === "All sectors" || item.sector === sector;

      const matchesSearch =
        !query ||
        [item.bidder, item.tender, item.sector, item.status]
          .some((value) => value.toLowerCase().includes(query));

      return matchesSector && matchesSearch;
    });
  }, [sector, search]);

  const activeTenders = filteredTenders.filter(
    (item) => item.status !== "Completed"
  ).length;

  return (
    <div className="dashboard">
      <section className="page-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" />
            PROCUREMENT INTELLIGENCE
          </div>
          <h1>Good morning, Officer <span className="heading-wave">✦</span></h1>
          <p className="page-subtitle">
            Here's an overview of your procurement compliance operations.
          </p>
        </div>

        <div className="heading-actions">
          <button
            className="button button-secondary"
            onClick={() => window.alert("Report export will be connected to FastAPI in a later step.")}
          >
            <FileText size={17} />
            Export report
          </button>
          <button
            className="button button-primary"
            onClick={() => window.location.assign("/tenders")}
          >
            <Plus size={18} />
            Create tender
          </button>
        </div>
      </section>

      <section className="filter-bar">
        <div className="filter-context">
          <span className="filter-label">VIEW BY SECTOR</span>
          <label className="select-wrap">
            <BriefcaseBusiness size={16} />
            <select value={sector} onChange={(e) => setSector(e.target.value)}>
              {sectors.map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} className="select-chevron" />
          </label>
        </div>

        <div className="filter-context">
          <span className="filter-label">TIME PERIOD</span>
          <label className="select-wrap">
            <CalendarDays size={16} />
            <select value={period} onChange={(e) => setPeriod(e.target.value)}>
              {["Last 7 days", "Last 30 days", "Last 90 days"].map((item) => (
                <option key={item} value={item}>{item}</option>
              ))}
            </select>
            <ChevronDown size={15} className="select-chevron" />
          </label>
        </div>

        <div className="sample-indicator">
          <span />
          Demo data
        </div>
      </section>

      <section className="metric-grid">
        <MetricCard
          label="Active tenders"
          value={String(activeTenders).padStart(2, "0")}
          change="+12.5%"
          description="Compared with previous period"
          icon={FileText}
          tone="blue"
        />
        <MetricCard
          label="Bids under review"
          value="24"
          change="+8.2%"
          description="Across all procurement sectors"
          icon={Users}
          tone="purple"
        />
        <MetricCard
          label="Checks verified"
          value="186"
          change="+18.6%"
          description="Successfully completed checks"
          icon={ShieldCheck}
          tone="green"
        />
        <MetricCard
          label="Need attention"
          value="07"
          change="-4.3%"
          description="Unresolved high-priority items"
          icon={ShieldAlert}
          tone="amber"
        />
      </section>

      <section className="dashboard-main-grid">
        <article className="panel tender-panel">
          <div className="panel-heading">
            <div>
              <h2>Recent tenders</h2>
              <p>Track procurement activity and verification progress.</p>
            </div>
            <button
              className="text-button"
              onClick={() => window.location.assign("/tenders")}
            >
              View all <ArrowRight size={15} />
            </button>
          </div>

          <div className="table-scroll">
            <table className="data-table">
              <thead>
                <tr>
                  <th>TENDER / BUYER</th>
                  <th>SECTOR</th>
                  <th>BIDS</th>
                  <th>PROGRESS</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenders.map((tender) => (
                  <tr key={tender.id}>
                    <td>
                      <div className="tender-title">{tender.title}</div>
                      <div className="table-secondary">{tender.id}</div>
                      <div className="table-buyer">{tender.buyer}</div>
                    </td>
                    <td>
                      <span className="sector-label">{tender.sector}</span>
                    </td>
                    <td className="numeric-cell">{tender.bids}</td>
                    <td>
                      <div className="progress-meta">
                        <span>{tender.verified}/{tender.bids}</span>
                        <span>
                          {Math.round((tender.verified / tender.bids) * 100)}%
                        </span>
                      </div>
                      <div className="progress-track">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${(tender.verified / tender.bids) * 100}%`,
                          }}
                        />
                      </div>
                    </td>
                    <td><StatusBadge status={tender.status} /></td>
                  </tr>
                ))}
                {filteredTenders.length === 0 && (
                  <tr>
                    <td colSpan="5" className="empty-state">
                      No tenders match your search and sector filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="panel-footer">
            <span>Showing {filteredTenders.length} tenders in this view</span>
            <span>Updated just now · Demo</span>
          </div>
        </article>

        <article className="panel distribution-panel">
          <div className="panel-heading">
            <div>
              <h2>Compliance overview</h2>
              <p>Distribution of verification outcomes.</p>
            </div>
            <span className="subtle-icon"><ShieldCheck size={19} /></span>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={distribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={66}
                  outerRadius={91}
                  paddingAngle={4}
                  stroke="none"
                >
                  {distribution.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="chart-center">
              <strong>100%</strong>
              <span>Demo sample</span>
            </div>
          </div>

          <div className="legend-list">
            {distribution.map((item) => (
              <div className="legend-row" key={item.name}>
                <span className="legend-label">
                  <span className="legend-dot" style={{ background: item.color }} />
                  {item.name}
                </span>
                <strong>{item.value}%</strong>
              </div>
            ))}
          </div>

          <div className="chart-note">
            <Clock3 size={15} />
            Sample distribution, not live government data
          </div>
        </article>
      </section>

      <section className="panel verification-panel">
        <div className="panel-heading">
          <div>
            <h2>Recent bidder verification</h2>
            <p>Latest compliance checks across all supported sectors.</p>
          </div>
          <button
            className="text-button"
            onClick={() => window.location.assign("/verification")}
          >
            Open verification <ArrowRight size={15} />
          </button>
        </div>

        <div className="table-scroll">
          <table className="data-table verification-table">
            <thead>
              <tr>
                <th>BIDDER</th>
                <th>TENDER ID</th>
                <th>COMPLIANCE SCORE</th>
                <th>STATUS</th>
                <th>LAST ACTIVITY</th>
              </tr>
            </thead>
            <tbody>
              {filteredVerifications.map((item) => (
                <tr key={item.tender}>
                  <td>
                    <div className="bidder-cell">
                      <div className="bidder-avatar">{item.initials}</div>
                      <div>
                        <div className="tender-title">{item.bidder}</div>
                        <div className="table-secondary">{item.sector}</div>
                      </div>
                    </div>
                  </td>
                  <td className="table-secondary">{item.tender}</td>
                  <td>
                    <div className="score-cell">
                      <strong>{item.score}</strong>
                      <span>/100</span>
                    </div>
                  </td>
                  <td><StatusBadge status={item.status} /></td>
                  <td className="table-secondary">{item.time}</td>
                </tr>
              ))}
              {filteredVerifications.length === 0 && (
                <tr>
                  <td colSpan="5" className="empty-state">
                    No verification records match your filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="panel-footer">
          <span>Showing {filteredVerifications.length} records in this view</span>
          <span className="demo-footnote">
            <CheckCircle2 size={14} /> Illustrative records only
          </span>
        </div>
      </section>

      <section className="bottom-notice">
        <div className="notice-icon"><ShieldCheck size={20} /></div>
        <div>
          <strong>Human-led procurement decisions</strong>
          <p>
            AI findings are decision-support recommendations. Final bidder
            qualification or disqualification remains with the authorised
            procurement officer.
          </p>
        </div>
      </section>
    </div>
  );
}
