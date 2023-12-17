import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Link, Box } from "@mui/material";

function SellerSignInForm(props) {
  const [contact, setContact] = useState("");
  const [password, setPassword] = useState("");
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [data, setData] = useState("");
  const [contactError, setContactError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (hasSubmitted) {
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
            navigate(`/dashboard/vendor/${data.for.id}`);
            window.location.reload();
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

    // navigate(`/dashboard/vendor/${id}`);
  }

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
      <h1>
        <span>Seller Login</span>
      </h1>

      <Link href="/login_or_register/login" className="signin">
        Login As A Customer
      </Link>
      <Box paddingBottom=".5rem"></Box>

      <TextField
        fullWidth
        type="number"
        name="contact"
        label="Enter Phone Number"
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
        fullWidth
        type="password"
        label="Enter Password"
        name="psw"
        required
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
          setPasswordError("");
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
          fullWidth
          variant="contained"
          style={{ backgroundColor: "black" }}
        >
          Login
        </Button>
      </Box>

      <p>
        Have no account yet?{" "}
        <Link href="/login_or_register/sellerSignup">
          Register now as a Seller
        </Link>
        .
      </p>
    </Box>
  );
}

export default SellerSignInForm;
