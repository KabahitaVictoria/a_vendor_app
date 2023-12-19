import PropTypes from "prop-types";
import CategoriesCard from "../components/LandingPageComponents/CategoriesCard";
import "../styles/Sidebar.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const Sidebar = (props) => {
  const navigate = useNavigate();
  const [businessCategories, setBusinessCategories] = useState([]);

  const id = localStorage.getItem("user_id")
    ? JSON.parse(localStorage.getItem("user_id"))
    : null;

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

  const userType = JSON.parse(localStorage.getItem("user_type"));

  const handleCategoryClick = (title) => {
    if (userType === "vendor") {
      console.log("Navigating to vendor route");
      // Vendor is logged in, navigate to specific vendor route
      navigate(`/dashboard/${title}/vendor/${id}`);
    } else if (userType === "customer") {
      console.log("Navigating to customer route");
      // Customer is logged in, navigate to specific customer route
      navigate(`/dashboard/${title}/customer/${id}`);
    } else {
      console.log("Navigating to default route");
      // User is not logged in, navigate to a default route
      navigate(`/dashboard/${title}`);
    }
  };

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const getFirstName = () =>
    localStorage.getItem("first_name")
      ? JSON.parse(localStorage.getItem("first_name"))
      : null;

  // const onAccountClick = () => {
  //   const token = getToken();
  //   if (token) {
  //     if (userType === "customer") {
  //       navigate(`/dashboard/account/customer/${id}`);
  //     } else if (userType === "vendor") {
  //       navigate(`/dashboard/account/${userType}/${id}`);
  //     } else if (userType === "admin") {
  //       navigate(`/dashboard/account/admin/${id}`);
  //     }
  //   } else {
  //     alert("Please sign in to access your account.");
  //   }
  // };

  const closeSidebar = () => {
    console.log("Closing sidebar"); // Debugging
    props.toggleSidebar(); // Use toggleSidebar to close the sidebar
  };

  return (
    <>
      <div className={`sidebar`}>
        <div className="top-info">
          <p>Welcome, {getFirstName() || "guest"}!</p>
        </div>
        <div className="sidebar-content">
          <div className="categories">
            <div className="categories-top">
              <h3>
                <span>Categories</span>
              </h3>
              {/* <button className="sell-button">SELL</button> */}
            </div>
            {businessCategories.map((businessCategory) => {
              const categoryNameInUrl = businessCategory.name
                .replace(/\s+/g, "-")
                .toLowerCase();
              return (
                <div
                  className={businessCategory.name}
                  key={businessCategory.id}
                  onClick={() => handleCategoryClick(categoryNameInUrl)}
                >
                  <CategoriesCard
                    src={businessCategory.icon}
                    name={businessCategory.name}
                  />
                </div>
              );
            })}
          </div>
          <div className="settings">
            <h3>
              <span>Settings</span>
            </h3>
            {/* <a
              href={`/dashboard/account/${userType}/${id}`}
              onClick={onAccountClick}
            >
              Your Account
            </a> */}
          </div>
        </div>
      </div>
      <div className="overlay active" onClick={closeSidebar}></div>
    </>
  );
};

export default Sidebar;
