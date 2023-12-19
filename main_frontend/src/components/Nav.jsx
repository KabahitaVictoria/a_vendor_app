import "../styles/Nav.css";
import { Link, useParams } from "react-router-dom";

const Nav = () => {
  const { customerId, id, businessId } = useParams();
  const userType = JSON.parse(localStorage.getItem("user_type"));

  const determineRoutePath = () => {
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

  return (
    <div className="nav">
      <h2 onClick={determineRoutePath}>
        SmallBizSafari
      </h2>
      <div className="nav-buttons">
        <>
          <Link to={`/login_or_register/login`} className="login">
            Login
          </Link>
          <p>|</p>
          <Link to="/login_or_register/signup" className="register">
            Register
          </Link>
        </>
      </div>
    </div>
  );
};

export default Nav;
