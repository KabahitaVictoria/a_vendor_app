import { useState } from "react";
import { useParams } from "react-router-dom";
import { TextField, Box, Button, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
  },
});

const CategoryForm = ({ onCategorySubmit }) => {
  const [name, setName] = useState("");

  const { businessId } = useParams();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const categoryData = {
      name,
    };

    fetch(`http://localhost:5000/categories/${businessId}/create`, {
      method: "POST",
      body: JSON.stringify(categoryData),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("New Category,", data);

        if (onCategorySubmit) {
          onCategorySubmit(data);
        }
      })
      .catch((err) => console.log(err));

    // Clear the form fields
    setName("");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        autoComplete="off"
        display="flex"
        flexDirection="column"
        alignItems="center"
        border="1px solid black"
        padding="1rem"
        margin=".5rem"
        borderRadius="10px"
      >
        <TextField
          label="Category Name"
          variant="outlined"
          name="category-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </Box>
    </ThemeProvider>
  );
};

export default CategoryForm;
