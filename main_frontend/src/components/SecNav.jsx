import Sidebar from "./Sidebar"; // Import the Sidebar component
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/SecNav.css";

const SecNav = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Initialize sidebarOpen state
  const [count, setCount] = useState(0);

  const navigate = useNavigate();
  const { customerId } = useParams();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  // Function to toggle the sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

    useEffect(() => {
      // Fetch the details of the product to be updated and set the state
      fetch(
        `http://localhost:5000/notifications/user_notifications/${customerId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          const notifData = data;
          console.log("Notif Data", notifData);
          setCount(notifData.count);
        })
        .catch((err) => console.error("Fetch error:", err));
    }, [customerId]);

  const onCartClick = () => {
    // Check if access token is present
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // If not present, show an alert to the user
      alert("Please log in to view your cart.");

      // Redirect to the login page
      navigate("/login_or_register/login");
    } else {
      // If access token is present, navigate to the cart page
      navigate(`/dashboard/cart-page/customer/${customerId}`);
    }
  };
  
  return (
    <div className="sec-nav">
      <button className="menu-button" onClick={toggleSidebar}>
        <img src="/icons/menu.png" alt="" />
      </button>
      {/* <button className="sell-button">SELL</button> */}

      <div className="cart-info" title="cart" onClick={onCartClick}>
        <img src="/icons/cart.png" alt="" />
        {count === 0 ? <p>0</p> : <p>{count}</p>}
      </div>

      {/* Conditionally render the Sidebar component based on sidebarOpen state */}
      {sidebarOpen && <Sidebar toggleSidebar={toggleSidebar} />}
    </div>
  );
};

export default SecNav;
