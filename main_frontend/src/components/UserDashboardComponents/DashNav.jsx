import "../../styles/Nav.css";
import { useNavigate, useParams } from "react-router-dom";

const DashNav = () => {
  const navigate = useNavigate();

  // Extract id parameter from URL
  const { businessId, id, customerId } = useParams();
  const userType = JSON.parse(localStorage.getItem("user_type"));

  // Remove access token from local storage
  const removeToken = () => {
    localStorage.removeItem("access_token");
  };

  const removeName = () => {
    localStorage.removeItem("first_name");
  };

  const removeType = () => {
    localStorage.removeItem("user_type");
  };

  const onHeadingClick = () => {
    if (userType === "customer" && customerId) {
      navigate(`/dashboard/customer/${customerId}`);
    } else if (userType === "vendor") {
      navigate(
        businessId
          ? `/dashboard/business_profile/${businessId}/vendor/${id}`
          : "/"
      );
    } else {
      navigate("/");
    }
  };

  function logMeOut() {
    fetch("http://localhost:5000/auth/logout", {
      method: "post", // Make a POST request
    })
      .then((res) => {
        // If successful, log the response, remove the access_token, and navigate to the home page
        console.log(res);
        removeToken();
        removeName();
        removeType();
        navigate("/");
      })
      .catch((err) => {
        // If there is an error, log the error response and its status and headers
        const errRes = err.response;
        console.log(errRes);
        console.log(errRes.status);
        console.log(errRes.headers);
      });
  }

  return (
    <div className="nav">
      <h2 onClick={onHeadingClick}>SmallBizSafari</h2>
      <div className="nav-buttons">
        <button className="logout" onClick={logMeOut}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashNav;
