
import { Navigate, Route, Routes } from "react-router-dom";
import RoleSelectionPage from "../features/auth/pages/RoleSelectionPage.jsx";
import BuyerHomePage from "../features/buyer/pages/BuyerHomePage.jsx";
import VendorHomePage from "../features/vendor/pages/VendorHomePage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<RoleSelectionPage />} />
      <Route path="/buyer" element={<BuyerHomePage />} />
      <Route path="/vendor" element={<VendorHomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
