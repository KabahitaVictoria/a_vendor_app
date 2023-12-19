import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Link,
  Box,
  IconButton,
  InputAdornment,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";

function LoginForm({ closeForm, handleLogin }) {
  // console.log(props);
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [data, setData] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [showSignUpForm, setShowSignUpForm] = useState(false);
  const [showSellerLoginForm, setShowSellerLoginForm] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const navigate = useNavigate();

    useEffect(() => {
      if (hasSubmitted) {
        setIsLoading(true);

        let isValid = true;

        if (!contact) {
          setContactError("Contact number is required");
          isValid = false;
        } else {
          setContactError("");
        }

        if (!password) {
          setPasswordError("Password is required");
          isValid = false;
        } else {
          setPasswordError("");
        }

        if (isValid) {
          handleLoginUser;
        }
      }
    }, [hasSubmitted]);

  function handleLoginUser(e) {
    e.preventDefault();

    let loginDetails = {
      contact: contact,
      password: password,
    };

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(loginDetails),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // Check if there is a message or error in the response data
        if (data.message) {
          setData(data.message);
          console.log(data);
          if (data.access_token) {
            localStorage.setItem(
              "access_token",
              JSON.stringify(data.access_token)
            );
            localStorage.setItem(
              "first_name",
              JSON.stringify(data.for.first_name)
            );
            localStorage.setItem("user_type", JSON.stringify(data.user_type));
            localStorage.setItem("user_id", JSON.stringify(data.for.id));
            navigate(`/dashboard/customer/${data.for.id}`);
            // window.location.reload();
            setIsLoading(false);
          }
        } else if (data.contact_error) {
          setContactError(data.contact_error);
        } else if (data.password_error) {
          console.log("data.password_error:", data.password_error);
          setPasswordError(data.password_error);
        }
      })
      .catch((err) => console.log(err));

    // Set state to indicate form submission
    setHasSubmitted(!hasSubmitted);
  }

  const toggleSignUpForm = () => {
    setShowSignUpForm(!showSignUpForm);
  };

  const toggleSellerLoginForm = () => {
    setShowSellerLoginForm(!showSellerLoginForm);
  };

  

  return (
    <Box
      width="30%"
      margin="0 auto"
      component="form"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      {isLoading && <CircularProgress style={{ margin: "1rem" }} />}

      <h1>
        <span>Customer Login</span>
      </h1>

      <Link
        href="/login_or_register/sellerSignin"
        className="signin"
        onClick={toggleSellerLoginForm}
      >
        Sign In As A Seller
      </Link>
      <Box paddingBottom=".5rem"></Box>

      <TextField
        fullWidth
        type="number"
        label="Enter Phone Number"
        name="contact"
        required
        value={contact}
        onChange={(e) => {
          setContact(e.target.value);
          setContactError("");
        }}
      />
      <p className="error">{contactError}</p>
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
          setPasswordError("");
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
      <p className="error">{passwordError}</p>
      <Box paddingBottom=".5rem"></Box>

      {/* Creating a button to submit the login form and a button to close the form */}
      <Box width="60%">
        <Button
          type="submit"
          className="btn"
          onClick={handleLoginUser}
          variant="contained"
          style={{ backgroundColor: "black" }}
          fullWidth
        >
          Login
        </Button>
      </Box>

      <p>
        Have no account yet?{" "}
        <Link href="/login_or_register/signup" onClick={toggleSignUpForm}>
          Register now
        </Link>
        .
      </p>
    </Box>
  );
}

export default LoginForm;
