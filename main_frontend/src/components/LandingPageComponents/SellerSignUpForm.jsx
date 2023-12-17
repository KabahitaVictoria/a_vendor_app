import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { TextField, Button, Link, Box } from "@mui/material";

export const SellerSignUpForm = (props) => {
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

    fetch("http://localhost:5000/auth/register/vendor", {
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
          navigate("/login_or_register/sellerSignin");
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((err) => console.log(err));

    setHasSubmitted(!hasSubmitted);
  };

  return (
    <>
      <Box
        onSubmit={handleFormSubmit}
        component="form"
        width="30%"
        margin="0 auto"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <h1>
          <span>Seller Sign Up</span>
        </h1>
        <p className="error">{error}</p>
        <Link href="/login_or_register/signup" className="signin">
          Sign Up As A Customer
        </Link>
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="text"
          label="Enter Your First Name"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="form2-input"
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="text"
          label="Enter Your Last Name"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="number"
          label="Enter Your Contact"
          name="contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="email"
          label="Enter Your Email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="password"
          label="Enter Password"
          name="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          required
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          fullWidth
        />
        <Box paddingBottom=".5rem"></Box>

        {/* Submit form details */}
        <Box width="60%">
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={{ backgroundColor: "black" }}
          >
            Sign Up
          </Button>
        </Box>
        <p>
          Already registered?{" "}
          <Link href="/login_or_register/sellerSignin">Log In as Seller</Link>.
        </p>
      </Box>
    </>
  );
};
