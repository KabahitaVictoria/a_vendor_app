import { SignUpForm } from "../components/LandingPageComponents/SignUpForm";
import LoginForm from "../components/LoginForm";
import SellerSignInForm from "../components/LandingPageComponents/SellerSignInForm";
import { SellerSignUpForm } from "../components/LandingPageComponents/SellerSignUpForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const LoginAndSignUpPage = () => {
  const [activeForm, setActiveForm] = useState("login"); // 'login' or 'signup'
  const { formType } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Set the initial active form based on the formType parameter
    if (formType) {
      setActiveForm(formType);
    }
  }, [formType]);

  const toggleForm = (formType) => {
    // Update the URL parameters when the form is toggled
    navigate(`/login_or_register/${formType}`);
    setActiveForm(formType);
  };

  return (
    <div className="">
      <div className="form-container">
        {activeForm === "signup" && (
          <SignUpForm closeForm={() => toggleForm(null)} />
        )}
        {activeForm === "sellerSignin" && (
          <SellerSignInForm closeForm={() => toggleForm(null)} />
        )}
        {activeForm === "login" && (
          <LoginForm closeForm={() => toggleForm(null)} />
        )}
        {activeForm === "sellerSignup" && (
          <SellerSignUpForm closeForm={() => toggleForm(null)} />
        )}
      </div>
    </div>
  );
}

export default LoginAndSignUpPage;