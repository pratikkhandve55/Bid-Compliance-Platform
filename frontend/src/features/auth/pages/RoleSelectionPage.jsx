
import { useNavigate } from "react-router-dom";
import { ShieldCheck, Search, Building2, FileCheck2, ArrowRight } from "lucide-react";

export default function RoleSelectionPage() {
  const navigate = useNavigate();

  return (
    <main className="role-page">
      <nav className="public-nav">
        <div className="brand">
          <div className="brand-mark"><ShieldCheck size={23} /></div>
          <div>
            <strong>BidSure</strong>
            <span>GeM Bid Compliance Platform</span>
          </div>
        </div>
        <span className="demo-label">CAPSTONE DEMO</span>
      </nav>

      <section className="role-hero">
        <div className="eyebrow">SMARTER PROCUREMENT. TRUSTED SUPPLIERS.</div>
        <h1>Procurement decisions,<br /><span>backed by evidence.</span></h1>
        <p>
          Discover suppliers, review compliance evidence, and manage
          procurement documents in one place.
        </p>
      </section>

      <section className="role-grid">
        <button className="role-card" onClick={() => navigate("/buyer")}>
          <div className="role-icon buyer-icon"><Search size={27} /></div>
          <span className="role-kicker">FOR BUYERS</span>
          <h2>I'm a Procurement Officer</h2>
          <p>
            Find vendors by sector and product, compare their assessment
            scores, review evidence, and contact shortlisted suppliers.
          </p>
          <ul>
            <li><FileCheck2 size={17} /> Review compliance results</li>
            <li><ShieldCheck size={17} /> Compare vendor risk signals</li>
            <li><Building2 size={17} /> Shortlist suitable suppliers</li>
          </ul>
          <span className="role-cta">Enter procurement portal <ArrowRight size={18} /></span>
        </button>

        <button className="role-card" onClick={() => navigate("/vendor")}>
          <div className="role-icon vendor-icon"><Building2 size={27} /></div>
          <span className="role-kicker">FOR SELLERS</span>
          <h2>I'm a Vendor / Seller</h2>
          <p>
            Set up your company profile, list products or services, upload
            supporting PDFs, and track document review progress.
          </p>
          <ul>
            <li><FileCheck2 size={17} /> Upload company documents</li>
            <li><ShieldCheck size={17} /> Track verification status</li>
            <li><Building2 size={17} /> Manage your listings</li>
          </ul>
          <span className="role-cta">Enter vendor portal <ArrowRight size={18} /></span>
        </button>
      </section>

      <p className="role-footnote">
        Prototype notice: vendor rankings and verification results shown in
        this demo are illustrative, not official GeM certifications.
      </p>
    </main>
  );
}
