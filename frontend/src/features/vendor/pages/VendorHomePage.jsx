
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft, ShieldCheck, Building2, Package, UploadCloud,
  FileText, Trash2, CheckCircle2, Clock3, AlertCircle
} from "lucide-react";

const requirements = {
  "Electronics & IT": ["Company registration document", "Product specification sheet", "Warranty / OEM document"],
  Healthcare: ["Company registration document", "Device specification sheet", "Applicable regulatory documents"],
  "Civil Works": ["Contractor registration document", "Work completion certificate", "Financial / experience evidence"],
};

export default function VendorHomePage() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [email, setEmail] = useState("");
  const [sector, setSector] = useState("Electronics & IT");
  const [product, setProduct] = useState("");
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState("");

  function addFiles(event) {
    const selected = Array.from(event.target.files || []);
    const invalid = selected.filter((file) => file.type !== "application/pdf");
    const oversized = selected.filter((file) => file.size > 10 * 1024 * 1024);
    const valid = selected.filter(
      (file) => file.type === "application/pdf" && file.size <= 10 * 1024 * 1024
    );

    if (invalid.length || oversized.length) {
      setMessage("Only PDF files up to 10 MB each are accepted in this demo.");
    } else {
      setMessage("");
    }

    setFiles((current) => {
      const combined = [...current, ...valid];
      return combined.filter(
        (file, index) => combined.findIndex((other) =>
          other.name === file.name && other.size === file.size
        ) === index
      );
    });
    event.target.value = "";
  }

  function submitProfile(event) {
    event.preventDefault();
    if (!company.trim() || !email.trim() || !product.trim() || files.length === 0) {
      setMessage("Please complete the required fields and upload at least one PDF.");
      return;
    }
    setSubmitted(true);
    setMessage("Demo submission recorded in this page. No data or files have been sent to a server.");
  }

  return (
    <main className="portal-page">
      <header className="portal-topbar">
        <button className="back-button" onClick={() => navigate("/")}>
          <ArrowLeft size={18} /> Change role
        </button>
        <div className="brand compact-brand">
          <div className="brand-mark"><ShieldCheck size={21} /></div>
          <div><strong>BidSure</strong><span>Vendor Portal</span></div>
        </div>
        <span className="demo-label">DEMO DATA</span>
      </header>

      <section className="portal-content vendor-content">
        <div className="portal-heading">
          <div>
            <div className="eyebrow">VENDOR WORKSPACE</div>
            <h1>Present your business.</h1>
            <p>Maintain your supplier profile, list what you offer, and prepare evidence for review.</p>
          </div>
          <div className="heading-icon vendor-heading-icon"><Building2 size={27} /></div>
        </div>

        <div className="vendor-progress">
          <div className="progress-step active"><span>1</span><div><strong>Company profile</strong><small>Business information</small></div></div>
          <div className="progress-line" />
          <div className={`progress-step ${files.length ? "active" : ""}`}><span>2</span><div><strong>Documents</strong><small>PDF evidence</small></div></div>
          <div className="progress-line" />
          <div className={`progress-step ${submitted ? "active" : ""}`}><span>3</span><div><strong>Review status</strong><small>Officer / system review</small></div></div>
        </div>

        <form className="vendor-form-layout" onSubmit={submitProfile}>
          <div className="form-panel">
            <div className="panel-heading"><Building2 size={20} /><div><h2>Company information</h2><p>Enter your business details</p></div></div>

            <label className="field-label">Company / business name <span>*</span></label>
            <input className="form-input" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="e.g. Apex Technologies" required />

            <label className="field-label">Business contact email <span>*</span></label>
            <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" required />

            <label className="field-label">Sector <span>*</span></label>
            <select className="form-input" value={sector} onChange={(e) => setSector(e.target.value)}>
              {Object.keys(requirements).map((item) => <option key={item}>{item}</option>)}
            </select>

            <div className="panel-heading product-heading"><Package size={20} /><div><h2>Product or service listing</h2><p>Describe what your business supplies</p></div></div>

            <label className="field-label">Product / service name <span>*</span></label>
            <input className="form-input" value={product} onChange={(e) => setProduct(e.target.value)} placeholder="e.g. Desktop computers" required />

            <label className="field-label">Description</label>
            <textarea className="form-input form-textarea" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Specifications, capacity, model, scope of service..." rows={4} />

            <button type="submit" className="primary-button submit-button">
              {submitted ? "Update demo submission" : "Submit for demo review"}
            </button>
            {message && <p className={`form-message ${submitted ? "message-success" : ""}`}>{message}</p>}
          </div>

          <aside className="upload-column">
            <div className="form-panel upload-panel">
              <div className="panel-heading"><UploadCloud size={20} /><div><h2>Supporting documents</h2><p>Upload relevant evidence as PDFs</p></div></div>

              <label className="upload-zone">
                <UploadCloud size={30} />
                <strong>Click to upload PDF files</strong>
                <span>PDF only · Maximum 10 MB per file</span>
                <input type="file" accept="application/pdf,.pdf" multiple onChange={addFiles} />
              </label>

              {files.length > 0 && (
                <div className="uploaded-files">
                  <h3>Selected files ({files.length})</h3>
                  {files.map((file, index) => (
                    <div className="uploaded-file" key={`${file.name}-${file.size}-${index}`}>
                      <FileText size={20} />
                      <div><strong>{file.name}</strong><span>{(file.size / 1024 / 1024).toFixed(2)} MB · Local selection</span></div>
                      <button type="button" className="remove-file" aria-label={`Remove ${file.name}`} onClick={() => setFiles((current) => current.filter((_, i) => i !== index))}><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              )}

              <div className="requirements-box">
                <h3>Suggested documents for {sector}</h3>
                {requirements[sector].map((item) => (
                  <div className="requirement-row" key={item}><FileText size={16} /><span>{item}</span></div>
                ))}
                <p>Actual requirements depend on the tender and applicable rules.</p>
              </div>
            </div>

            <div className="form-panel status-panel">
              <div className="panel-heading"><Clock3 size={20} /><div><h2>Verification status</h2><p>Prototype workflow</p></div></div>
              <div className="status-step"><CheckCircle2 size={18} /><div><strong>Profile form</strong><span>{submitted ? "Submitted in this demo" : "Not submitted"}</span></div></div>
              <div className="status-step"><Clock3 size={18} /><div><strong>Document review</strong><span>{submitted ? "Pending actual review" : "Waiting for submission"}</span></div></div>
              <div className="status-step"><AlertCircle size={18} /><div><strong>Final decision</strong><span>Procurement officer decision required</span></div></div>
              <p className="status-disclaimer">This prototype does not authenticate documents or issue official certifications.</p>
            </div>
          </aside>
        </form>
      </section>
    </main>
  );
}
