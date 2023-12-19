import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import LandingPage from "./pages/LandingPage";
import LoginAndSignUpPage from "./pages/LoginAndSignUpPage";
import UserDashboard from "./pages/UserDashboard";
import BusinessProfilePage from "./pages/BusinessProfilePage";
import AccountPage from "./pages/AccountPage";
import BusinessCategoryPage from "./pages/BusinessCategoryPage";
import TopInHealthAndBeauty from "./pages/TopInHealthAndBeauty";
import CartPage from "./pages/CartPage";
import RatingPage from "./pages/RatingPage";
import BusinessProducts from "./components/BusinessProducts";
import SingleProductPage from "./pages/SingleProductPage";
import AllRatingsPage from "./pages/AllRatingsPage";
import SecNav from "./components/SecNav";
import Sidebar from "./components/Sidebar"
import { useParams } from "react-router-dom";

// VENDOR PAGES
import VendorDash from "./pages/vendor_pages/VendorDash";
import VendorProfilePage from "./pages/vendor_pages/VendorProfilePage";
import VendorSingleProductPage from "./pages/vendor_pages/VendorSingleProductPage";
import VendorUploadProductPage from "./pages/vendor_pages/VendorUploadProductPage";
import VendorRegistrationPage from "./pages/vendor_pages/VendorRegistrationPage";
import VendorNotificationsPage from "./pages/vendor_pages/VendorNotificationsPage";
import Dash from "./dashboard/dashboardapp";
import "./App.css";

// ADMIN PAGES
import AdminAddCategoriesPage from "./pages/admin_pages/AdminAddCategoriesPage";

const IndexLandingPage = () => (
  <div>
    <LandingPage />
  </div>
);

function App() {
  const userType = JSON.parse(localStorage.getItem("user_type"));
  const [businessCategories, setBusinessCategories] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

    const toggleSidebar = () => {
      setSidebarOpen(!sidebarOpen);
    };

  const { id, customerId } = useParams();

  useEffect(() => {
    // Fetch existing categories from the server
    fetch(`http://localhost:5000/business_categories/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBusinessCategories(data.data || []);
        console.log("business categories data:", data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" index element={<IndexLandingPage />} />
        <Route
          path="/dashboard/*"
          element={<Sidebar toggleSidebar={toggleSidebar} />}
        />
        <Route path="/*" element={<Sidebar toggleSidebar={toggleSidebar} />} />

        <Route
          path="/login_or_register/:formType"
          element={<LoginAndSignUpPage />}
        />

        <Route
          path={`/dashboard/customer/:customerId`}
          element={<UserDashboard />}
        />
        <Route
          path={`/dashboard/business_profile/:businessId/vendor/:id/`}
          element={<VendorProfilePage />}
        />
        <Route
          path={`/dashboard/business_profile/:businessId/vendor/:id/customer/:customerId`}
          element={<VendorProfilePage />}
        />
        <Route
          path={`/dashboard/biz_profile/${userType}/:id`}
          element={<BusinessProfilePage />}
        />
        <Route
          path={`/dashboard/account/${userType}/:id`}
          element={<AccountPage />}
        />
        {businessCategories.map((businessCategory) => {
          const categoryNameInUrl = businessCategory.name
            .replace(/\s+/g, "-")
            .toLowerCase();
          let routePath;

          if (userType === "vendor") {
            // Vendor is logged in
            routePath = `/dashboard/${categoryNameInUrl}/vendor/:id`;
          } else if (userType === "customer") {
            // Customer is logged in
            routePath = `/dashboard/${categoryNameInUrl}/customer/:customerId`;
          } else {
            // User is not logged in
            routePath = `/dashboard/${categoryNameInUrl}`;
          }
          return (
            <Route
              path={routePath}
              key={businessCategory.id}
              element={
                <BusinessCategoryPage
                  title={businessCategory.name}
                  businesses={businessCategory.products}
                  icon={businessCategory.icon}
                />
              }
            />
          );
        })}
        <Route
          path={`/dashboard/top-in-health-and-beauty/${userType}/:id`}
          element={<TopInHealthAndBeauty />}
        />

        <Route
          path="/dashboard/cart-page/customer/:customerId"
          element={<CartPage />}
        />
        <Route path="/dashboard/rating" element={<RatingPage />} />
        <Route
          path={`/dashboard/rating/${userType}/:id`}
          element={<RatingPage />}
        />
        <Route
          path={`/dashboard/business_products/${userType}/:id`}
          element={<BusinessProducts />}
        />
        <Route
          path={`/dashboard/business/:businessId/single_product/:productId/vendor/:id/customer/:customerId`}
          element={<SingleProductPage />}
        />
        <Route
          path={`/dashboard/all_ratings/${userType}/:id`}
          element={<AllRatingsPage />}
        />

        {/* VENDOR PAGES */}
        <Route path={`/dashboard/vendor/:id`} element={<VendorDash />} />
        <Route
          path={`/dashboard/business_profile/:businessId/vendor/:id`}
          element={<VendorProfilePage />}
        />
        <Route
          path={`/dashboard/business/:businessId/single_product/:productId/vendor/:id`}
          element={<VendorSingleProductPage />}
        />
        <Route
          path={`/dashboard/business/:businessId/upload_product/vendor/:id`}
          element={<VendorUploadProductPage />}
        />
        <Route
          path="/dashboard/vendor/upload_business/:id"
          element={<VendorRegistrationPage />}
        />
        <Route
          path="/dashboard/business/:businessId/notifications/vendor/:id"
          element={<VendorNotificationsPage />}
        />
        {/* notifications/:notifId/ */}

        {/* ADMIN ROUTES */}
        <Route
          path={`/dashboard/admin/add_category`}
          element={<AdminAddCategoriesPage />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
