import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminDashboard from "./pages/admindashboard/AdminDashboard";
import AddAndManageCategory from "./pages/admindashboard/AddAndManageCategory";
import AddAndManageMolecule from "./pages/admindashboard/AddAndManageMolecule";
import AddAndManageStrength from "./pages/admindashboard/AddAndManageStrength";
import AddAndManagePackagingSize from "./pages/admindashboard/AddAndManagePackageingSize";
import AddAndManageProducts from "./pages/admindashboard/AddAndManageProducts";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AboutUs from "./pages/AboutUs";
import OurVission from "./pages/OurVission";
import ContactUS from "./pages/ContactUS";
import OurProducts from "./pages/OurProducts";
import AddAndManageSlider from "./pages/admindashboard/AddAndManageSlider";
import AddAndManagePopup from "./pages/admindashboard/AddAndManagePopup";
import AdminLogin from "./pages/admindashboard/AdminLogin";
import OurGallery from "./pages/OurGallery";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ourproducts" element={<OurProducts />} />
        <Route path="/ourgallery" element={<OurGallery />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/ourvission" element={<OurVission />} />
        <Route path="/contactus" element={<ContactUS />} />

        {/* admin Panel */}
        <Route path="/reboots" element={<AdminLogin />} />

        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route
          path="/admin/add&manageproduct"
          element={<AddAndManageProducts />}
        />

        <Route
          path="/admin/add&managecategory"
          element={<AddAndManageCategory />}
        />
        <Route
          path="/admin/add&managemolecule"
          element={<AddAndManageMolecule />}
        />
        <Route
          path="/admin/add&managestrrength"
          element={<AddAndManageStrength />}
        />
        <Route
          path="/admin/add&managepackagingsize"
          element={<AddAndManagePackagingSize />}
        />
        <Route
          path="/admin/add&manageslider"
          element={<AddAndManageSlider />}
        />
        <Route path="/admin/add&managepopup" element={<AddAndManagePopup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
