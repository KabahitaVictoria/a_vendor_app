import { useState } from "react";
import {
  TextField,
  Button,
  Link,
  Box,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
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
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
      <Box
        onSubmit={handleFormSubmit}
        width="30%"
        margin="0 auto"
        component="form"
        display="flex"
        flexDirection="column"
        alignItems="center"
      >
        <h1>
          <span>Customer Sign Up</span>
        </h1>
        <Box
          color="black"
          padding=".5rem"
          component="a"
          href="/login_or_register/sellerSignup"
        >
          {/* <a href="/login_or_register/sellerSignup" className="signin">
          </a> */}
          Sign Up As A Seller
        </Box>
        <p className="error">{error}</p>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          required
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          required
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          fullWidth
          label="Contact"
          name="contact"
          required
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          type="number"
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          fullWidth
          label="Email"
          name="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type={showPassword ? "text" : "password"}
          label="Enter Password"
          name="psw"
          required
          fullWidth
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box paddingBottom=".5rem"></Box>

        <TextField
          type={showPassword ? "text" : "password"}
          label="Confirm Password"
          name="confirmPassword"
          required
          fullWidth
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleClickShowPassword}>
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Box paddingBottom=".5rem"></Box>

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
          <Link href="/login_or_register/login" underline="none">
            Log In
          </Link>
          .
        </p>
      </Box>
    </>
  );
};
