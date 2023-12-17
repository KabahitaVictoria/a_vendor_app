import "../styles/Nav.css";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <div className="nav">
      <h2>SmallBizSafari</h2>
      <div className="nav-buttons">
        <>
          <Link
            to={`/login_or_register/login`}
            className="login"
          >
            Login
          </Link>
          <p>|</p>
          <Link
            to="/login_or_register/signup"
            className="register"
          >
            Register
          </Link>
        </>
      </div>
    </div>
  );
};

export default Nav;
