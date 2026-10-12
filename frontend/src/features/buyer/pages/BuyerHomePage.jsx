
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, Search, ShieldCheck, Laptop, HeartPulse, HardHat,
  SlidersHorizontal, ArrowUpDown, MapPin, Mail, Phone, FileCheck2,
  ChevronRight, X, CheckCircle2, AlertTriangle, Eye, Building2
} from "lucide-react";

const sectors = [
  { id: "Electronics & IT", icon: Laptop, description: "Computers, networking and IT equipment" },
  { id: "Healthcare", icon: HeartPulse, description: "Medical devices and hospital equipment" },
  { id: "Civil Works", icon: HardHat, description: "Construction and infrastructure services" },
];

const vendors = [
  {
    id: 1, name: "Apex Technologies", sector: "Electronics & IT",
    product: "Desktop Computers & Workstations", score: 92, status: "Verified",
    location: "Pune, Maharashtra", email: "sales@apex-demo.example",
    checks: "11 of 12", documents: ["Company Registration", "Product Specification Sheet", "Warranty Declaration"],
    summary: "Strong document completeness with a small number of checks requiring officer review."
  },
  {
    id: 2, name: "DigitalTech Solutions", sector: "Electronics & IT",
    product: "Network Switches & Accessories", score: 97, status: "Verified",
    location: "Mumbai, Maharashtra", email: "sales@digitaltech-demo.example",
    checks: "12 of 12", documents: ["Company Registration", "OEM Authorization", "Product Datasheet"],
    summary: "Sample profile with all configured prototype checks passing."
  },
  {
    id: 3, name: "Medline Medical Systems", sector: "Healthcare",
    product: "Patient Monitoring Equipment", score: 76, status: "Needs review",
    location: "Pune, Maharashtra", email: "contact@medline-demo.example",
    checks: "8 of 10", documents: ["Company Registration", "Device Datasheet", "Warranty Declaration"],
    summary: "Some document and applicability checks need review by the procurement officer."
  },
  {
    id: 4, name: "CarePoint Equipments", sector: "Healthcare",
    product: "Hospital Beds & Patient Accessories", score: 89, status: "Verified",
    location: "Nashik, Maharashtra", email: "sales@carepoint-demo.example",
    checks: "10 of 10", documents: ["Company Registration", "Product Datasheet", "Warranty Declaration"],
    summary: "Sample profile with complete configured checks for this demonstration."
  },
  {
    id: 5, name: "InfraBuild Contractors", sector: "Civil Works",
    product: "Road Resurfacing & Repair Works", score: 58, status: "Action required",
    location: "Pimpri-Chinchwad, Maharashtra", email: "office@infrabuild-demo.example",
    checks: "6 of 10", documents: ["Company Registration", "Work Completion Certificate"],
    summary: "Missing or unresolved evidence means the officer should review eligibility before proceeding."
  },
  {
    id: 6, name: "CivicRoad Engineering", sector: "Civil Works",
    product: "Road Maintenance & Pavement Works", score: 86, status: "Verified",
    location: "Pune, Maharashtra", email: "contact@civicroad-demo.example",
    checks: "9 of 10", documents: ["Contractor Registration", "Work Completion Certificate", "Equipment List"],
    summary: "Most configured checks pass; one item remains flagged for manual review."
  },
];

function statusClass(status) {
  if (status === "Verified") return "status-good";
  if (status === "Needs review") return "status-review";
  return "status-danger";
}

export default function BuyerHomePage() {
  const navigate = useNavigate();
  const [sector, setSector] = useState("Electronics & IT");
  const [query, setQuery] = useState("");
  const [sortHigh, setSortHigh] = useState(true);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [shortlisted, setShortlisted] = useState([]);

  const results = useMemo(() => {
    return vendors
      .filter((vendor) => vendor.sector === sector)
      .filter((vendor) =>
        `${vendor.name} ${vendor.product} ${vendor.location}`
          .toLowerCase().includes(query.toLowerCase())
      )
      .sort((a, b) => sortHigh ? b.score - a.score : a.score - b.score);
  }, [sector, query, sortHigh]);

  function toggleShortlist(id) {
    setShortlisted((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  }

  return (
    <main className="portal-page">
      <header className="portal-topbar">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Change role
        </button>
        <div className="brand compact-brand">
          <div className="brand-mark"><ShieldCheck size={21} /></div>
          <div><strong>BidSure</strong><span>Procurement Portal</span></div>
        </div>
        <span className="demo-label">DEMO DATA</span>
      </header>

      <section className="portal-content">
        <div className="portal-heading">
          <div>
            <div className="eyebrow">PROCUREMENT WORKSPACE</div>
            <h1>Find the right supplier.</h1>
            <p>Choose a sector, search for an item, and review evidence-backed vendor assessments.</p>
          </div>
          <div className="heading-icon"><Search size={27} /></div>
        </div>

        <div className="section-heading">
          <div><span className="step-number">01</span><h2>Select a sector</h2></div>
          <span className="muted-text">Choose one to explore suppliers</span>
        </div>

        <div className="sector-grid">
          {sectors.map(({ id, icon: Icon, description }) => (
            <button
              key={id}
              className={`sector-card ${sector === id ? "sector-active" : ""}`}
              onClick={() => { setSector(id); setQuery(""); setSelectedVendor(null); }}
            >
              <span className="sector-icon"><Icon size={23} /></span>
              <span className="sector-name">{id}</span>
              <span className="sector-description">{description}</span>
              <span className="sector-select">{sector === id ? "Selected" : "Choose sector"}</span>
            </button>
          ))}
        </div>

        <div className="section-heading search-heading">
          <div><span className="step-number">02</span><h2>Search products or services</h2></div>
        </div>

        <div className="search-row">
          <div className="search-field">
            <Search size={19} />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search within ${sector}...`}
            />
            {query && <button className="clear-search" onClick={() => setQuery("")}><X size={16} /></button>}
          </div>
          <button className="secondary-button" onClick={() => setSortHigh((value) => !value)}>
            <ArrowUpDown size={17} /> Score: {sortHigh ? "Highest first" : "Lowest first"}
          </button>
        </div>

        <div className="results-title">
          <div><h2>Supplier matches</h2><p>{results.length} sample vendors in {sector}</p></div>
          <span className="assessment-note"><ShieldCheck size={16} /> Platform assessment</span>
        </div>

        {results.length === 0 ? (
          <div className="empty-state"><Search size={28} /><h3>No matching vendors</h3><p>Try another product name or select a different sector.</p></div>
        ) : (
          <div className="vendor-list">
            {results.map((vendor, index) => (
              <article className="vendor-card" key={vendor.id}>
                <div className="vendor-rank">#{index + 1}</div>
                <div className="vendor-main">
                  <div className="vendor-title-row">
                    <div className="vendor-avatar"><Building2 size={22} /></div>
                    <div className="vendor-title">
                      <h3>{vendor.name}</h3>
                      <p>{vendor.product}</p>
                    </div>
                    <span className={`status-pill ${statusClass(vendor.status)}`}>{vendor.status}</span>
                  </div>
                  <div className="vendor-meta"><MapPin size={15} /> {vendor.location}<span className="meta-divider">•</span><FileCheck2 size={15} /> {vendor.checks} checks passed</div>
                  <div className="vendor-actions">
                    <button className="text-button" onClick={() => setSelectedVendor(vendor)}><Eye size={16} /> Review assessment</button>
                    <button className="secondary-button small-button" onClick={() => toggleShortlist(vendor.id)}>
                      {shortlisted.includes(vendor.id) ? "✓ Shortlisted" : "+ Shortlist"}
                    </button>
                  </div>
                </div>
                <div className="vendor-score">
                  <div className={`score-ring ${vendor.score < 65 ? "score-low" : vendor.score < 80 ? "score-mid" : ""}`}>
                    <strong>{vendor.score}</strong><span>/100</span>
                  </div>
                  <span>Assessment score</span>
                </div>
              </article>
            ))}
          </div>
        )}

        <p className="disclaimer">
          <AlertTriangle size={16} /> Demonstration data only. Scores are illustrative and are not official GeM ratings,
          government certifications, or a final eligibility decision.
        </p>
      </section>

      {selectedVendor && (
        <div className="modal-backdrop" onClick={() => setSelectedVendor(null)}>
          <section className="vendor-modal" onClick={(event) => event.stopPropagation()}>
            <div className="modal-top">
              <div><div className="eyebrow">SUPPLIER ASSESSMENT</div><h2>{selectedVendor.name}</h2></div>
              <button className="icon-button" onClick={() => setSelectedVendor(null)}><X size={20} /></button>
            </div>
            <p className="modal-product">{selectedVendor.product}</p>
            <div className="modal-score-row">
              <div className={`score-ring large-score ${selectedVendor.score < 65 ? "score-low" : selectedVendor.score < 80 ? "score-mid" : ""}`}>
                <strong>{selectedVendor.score}</strong><span>/100</span>
              </div>
              <div><span className={`status-pill ${statusClass(selectedVendor.status)}`}>{selectedVendor.status}</span><p className="muted-text">Prototype assessment score</p></div>
            </div>
            <h3>Assessment summary</h3>
            <p className="summary-copy">{selectedVendor.summary}</p>
            <h3>Evidence listed in demo</h3>
            <ul className="evidence-list">
              {selectedVendor.documents.map((document) => (
                <li key={document}><CheckCircle2 size={17} />{document}<span>Sample evidence</span></li>
              ))}
            </ul>
            <div className="modal-note">
              <AlertTriangle size={17} /> Document labels do not mean the files have been independently authenticated. Officer review is required.
            </div>
            <div className="modal-actions">
              <button className="primary-button" onClick={() => toggleShortlist(selectedVendor.id)}>
                {shortlisted.includes(selectedVendor.id) ? "Remove from shortlist" : "Add to shortlist"}
              </button>
              <a className="secondary-button contact-button" href={`mailto:${selectedVendor.email}?subject=Supplier enquiry - BidSure demo`}>
                <Mail size={17} /> Contact vendor
              </a>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
