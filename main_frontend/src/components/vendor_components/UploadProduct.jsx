import "../../styles/UploadProduct.css";
import CategoryForm from "./CategoryForm";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";

const UploadProduct = () => {
  const [category, setCategory] = useState("");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(null);
  // const [businessCategories, setBusinessCategories] = useState([]);
  // const [businessCategoriesID, setBusinessCategoriesID] = useState(null);
  // const [businessID, setBusinessID] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const { businessId, id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch existing categories from the server
    fetch(`http://localhost:5000/categories/${businessId}/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
        console.log("categories data:", data.data);
      })
      .catch((err) => console.log(err));
  }, [businessId]);

  const handleProductSubmit = (e) => {
    e.preventDefault();

    const productData = {
      name: name,
      price: price,
      quantity: quantity,
      category_id: categoryId,
      description: description,
      // Add other properties as needed
    };

    fetch(`http://localhost:5000/products/create/${businessId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(productData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product created successfully:", data);
        // Handle success, e.g., redirect or display a success message
        navigate(`/dashboard/business_profile/${businessId}/vendor/${id}`);
      })
      .catch((error) => {
        console.error("Error creating product:", error);
        // Handle error, e.g., display an error message to the user
      });

    setProducts((prevProducts) => [...prevProducts, productData]);
  };

  const handleCategorySubmit = (categoryData) => {
    // Add the new category to the list of categories
    setCategories((prevCategories) => [...prevCategories, categoryData]);

    // Select the newly added category
    setCategory(categoryData.name);
    setCategoryId(categoryData.id);
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory);

    // Find the category ID based on the selected category name
    const selectedCategoryId = categories.find(
      (cat) => cat.name === selectedCategory
    )?.id;

    // Update the categoryId in the state
    setCategoryId(selectedCategoryId);
  };

  return (
    <div className="upload-product">
      <h1>ADD PRODUCT</h1>
      <form action="" className="category-form">
        <div className="">
          <FormControl fullWidth required>
            <FormLabel>Category</FormLabel>
            <Select
              value={category}
              onChange={(e) => handleCategoryChange(e.target.value)}
              inputProps={{ "aria-label": "Category" }}
            >
              <MenuItem value="">
                <em>Select a Category</em>
              </MenuItem>
              {/* Add your categories here */}
              <MenuItem value="+ Add Category">+ Add Category</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.name}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </form>
      {category === "+ Add Category" && (
        <CategoryForm onCategorySubmit={handleCategorySubmit} />
      )}

      <form
        action=""
        className="product-user-order"
        id="product-upload-form"
        onSubmit={handleProductSubmit}
      >
        <div className="product-update-form" id="product-upload-form-div">
          <TextField
            label="Product Name"
            variant="outlined"
            name="product-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            fullWidth
            margin="normal"
            className="placeholderCenter"
          />

          <TextField
            label="Product Price"
            variant="outlined"
            name="product-price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Quantity in Stock"
            variant="outlined"
            name="product-stock"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            fullWidth
            margin="normal"
          />

          <TextField
            label="Product Description"
            variant="outlined"
            name="product-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            fullWidth
            margin="normal"
            multiline
            rows={4}
          />

          <Box component="span" marginTop={2}>
            <Button type="submit" variant="contained" color="primary">
              Add
            </Button>
          </Box>
        </div>
      </form>
    </div>
  );
};

export default UploadProduct;
