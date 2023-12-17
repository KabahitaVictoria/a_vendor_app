import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../../styles/VendorPage.css";
import { useState, useEffect } from "react";

export const VendorDashMain = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [hasBusiness, setHasBusiness] = useState(null);

    const getToken = () =>
    localStorage.getItem("access_token")
        ? JSON.parse(localStorage.getItem("access_token"))
        : null;

    useEffect(() => {
      // Call the backend endpoint to check business status
      fetch(`http://localhost:5000/businesses/check-business-status/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setHasBusiness(data.has_business);
          if (data.has_business) {
            // Redirect to business profile page
            navigate(`/dashboard/business_profile/${data.business_id}/vendor/${id}`);
          }
        })
        .catch((error) =>
          console.error("Error checking business status:", error)
        );
    }, []);

    if (hasBusiness === null) {
      // Loading state or handle accordingly
      return null;
    }

    if (hasBusiness) {
      // User has a business, redirecting in useEffect
      return null;
    }

    function onRegisterButtonClick() {
    navigate(`/dashboard/vendor/upload_business/${id}/`);
    }

    return (
      <div className="vendor-dash-main">
        <button onClick={onRegisterButtonClick}>Register your Business</button>
      </div>
    );
}