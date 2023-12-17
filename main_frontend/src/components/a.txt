import { useState } from "react";
import LoginForm from "../LoginForm";
import { SellerSignUpForm } from "./SellerSignUpForm";
import { useNavigate } from "react-router-dom";

export const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [data, setData] = useState("");
  const [error, setError] = useState("");

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let signUpDetails = {
      first_name: firstName,
      last_name: lastName,
      email: email,
      contact: contact,
      password: password,
    };

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    fetch("http://localhost:5000/auth/register/customer", {
      method: "POST",
      body: JSON.stringify(signUpDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if there is a message or error in the response data
        if (data.message) {
          setData(data.message);
          navigate("/login_or_register/login");
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((err) => console.log(err));

    setHasSubmitted(!hasSubmitted);
  };

  return (
    <>
      <h1>
        <span>Customer Sign Up</span>
      </h1>
      <a href="/login_or_register/sellerSignup" className="signin">
        Sign Up As A Seller
      </a>
      <p className="error">{error}</p>
      {/* Display message if form has been submitted */}
      <form onSubmit={handleFormSubmit} className="form2">
        <input
          type="text"
          placeholder="Enter Your First Name"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter Your Last Name"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        ></input>

        <input
          type="text"
          placeholder="Enter Your Contact"
          name="contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        ></input>

        <input
          type="email"
          placeholder="Enter Your Email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        ></input>

        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        ></input>

        <input
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
        ></input>

        {/* Submit form details */}
        <button type="submit" className="btn">
          Sign Up
        </button>
      </form>

      <p>
        Already registered? <a href="/login_or_register/login">Log In</a>.
      </p>
    </>
  );
};
