import { useState } from "react";
import Sidebar from "../Sidebar"; // Import the Sidebar component
import { useNavigate, useParams } from "react-router-dom";
import "../../styles/SecNav.css";
import { Button } from "@mui/material";
import NotificationsOutlined from "@mui/icons-material/NotificationsOutlined";

const VendorSecNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initialize sidebarOpen state

  const navigate = useNavigate();
  const { businessId, id } = useParams();

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const onNotifClick = () => {
    navigate(`/dashboard/business/${businessId}/notifications/vendor/${id}`);
  }



  return (
    <div className="sec-nav">
      <button className="menu-button" onClick={toggleSidebar}>
        <img src="/icons/menu.png" alt="" />
      </button>
      {/* <button className="sell-button">SELL</button> */}


      {/* Add a profile icon next to the cart icon */}
      <div className="profile-info cart-info" title="profile">
        <Button
        variant="contained"
        color="primary"
        startIcon={<NotificationsOutlined />}
        onClick={onNotifClick}
      >
        Notifications
      </Button>
      </div>

      {/* Conditionally render the Sidebar component based on sidebarOpen state */}
      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
    </div>
  );
};

export default VendorSecNav;
