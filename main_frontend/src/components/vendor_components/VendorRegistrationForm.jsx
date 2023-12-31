import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import VendorTopSection from "./VendorTopSection";
import ProductForm from "./ProductForm";
import CategoryForm from "./CategoryForm";
import "../../styles/VendorPage.css";

const VendorRegistrationForm = () => {
  const [businessName, setBusinessName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [logo, setLogo] = useState("");
  const [description, setDescription] = useState("");
  const [videoUrl, setVideoUrl] = useState("");

  const [businessCategory, setBusinessCategory] = useState("");
  const [businessCategories, setBusinessCategories] = useState([]);
  const [businessCategoriesID, setBusinessCategoriesID] = useState(null);
  const [businessID, setBusinessID] = useState("");

  const [errors, setErrors] = useState({
    businessName: "",
    email: "",
    phone: "",
    logo: "",
    description: "",
    videoUrl: "",
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      businessName: "",
      email: "",
      phone: "",
      logo: "",
      description: "",
      videoUrl: "",
    };

    if (!businessName) {
      newErrors.businessName = "Please enter the business name.";
      isValid = false;
    }

    if (!email) {
      newErrors.email = "Please enter the email address.";
      isValid = false;
    }

    if (!phone) {
      newErrors.phone = "Please enter the phone number.";
      isValid = false;
    }

    if (!logo) {
      newErrors.logo = "Please enter the logo URL.";
      isValid = false;
    }

    if (!description) {
      newErrors.description = "Please enter a brief description.";
      isValid = false;
    }

    if (!videoUrl) {
      newErrors.videoUrl = "Please enter the video URL.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const { id } = useParams();
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    // Fetch existing categories from the server
    fetch("http://localhost:5000/business_categories/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Business Categories response:", data.data);
        setBusinessCategories(data.data);
        // console.log("Business Categories", data);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleBusinessCategoryChange = (e) => {
    const selectedCategoryID = e.target.value;
    const selectedCategory = businessCategories.find(
      (bCat) => bCat.id === parseInt(selectedCategoryID, 10)
    );

    if (selectedCategory) {
      setBusinessCategory(selectedCategory);
      setBusinessCategoriesID(selectedCategory.id);
    } else {
      setBusinessCategory(null);
      setBusinessCategoriesID(null);
    }
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    if (validateForm()) {
      const formData = {
        bus_name: businessName,
        email_addr: email,
        phone: phone,
        logo,
        description,
        videoUrl,
        business_category_id: businessCategoriesID,
      };

      console.log(formData);

      fetch(`http://localhost:5000/businesses/create/${id}`, {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          Authorization: `Bearer ${getToken()}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log("data", data);
          const createdBusinessId = data.data.id;

          // Set the business id in state
          setBusinessID(createdBusinessId);
          navigate(
            `/dashboard/business_profile/${createdBusinessId}/vendor/${id}`
          );
        })
        .catch((err) => console.log(err));
    } else {
      // Display an error message or take appropriate action
      console.error("Please fill in all required fields");
    }
  };

  // console.log('categories: ',categories);

  return (
    <div className="vendor-form-div">
      <h1>Register your Business</h1>
      <form onSubmit={handleFormSubmit}>
        <div className="form-info">
          <label>
            Business Name:
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.businessName}</p>
        </div>

        <div className="form-info">
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.email}</p>
        </div>

        <div className="form-info">
          <label>
            Phone:
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.phone}</p>
        </div>

        <div className="form-info">
          <label>
            Logo URL:
            <input
              type="file"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.logo}</p>
        </div>

        <div className="form-info">
          <label>
            Brief Description:
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.description}</p>
        </div>

        <div className="form-info">
          <label>
            Business Category:
            <select
              value={businessCategoriesID || ""} // Use businessCategoriesID
              onChange={handleBusinessCategoryChange}
              required
            >
              {!businessCategoriesID && ( // Conditionally render the default placeholder
                <option value="" disabled>
                  Select a Business Category
                </option>
              )}
              {Array.isArray(businessCategories) &&
                businessCategories.map((bCat) => (
                  <option key={bCat.id} value={bCat.id}>
                    {bCat.name}
                  </option>
                ))}
            </select>
          </label>
          {/* <p className="error">Please select a business category</p> */}
        </div>

        {/* <label>
          Location:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </label> */}

        <div className="form-info">
          <label>
            Video URL:
            <input
              type="file"
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              required
            />
          </label>
          <p className="error">{errors.videoUrl}</p>
        </div>

        {/* <div className="">
          <label>
            Category:
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="" disabled>
                Select a Category
              </option>
              {Array.isArray(categories) &&
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))}
              <option value="+ Add Category">+ Add Category</option>
            </select>
          </label>
        </div> */}

        {/* <div>
          <h3>Products:</h3>
          <ul>
            {products.map((product, index) => (
              <li key={index}>
                {product.name} - {product.description}
              </li>
            ))}
          </ul>
        </div> */}

        <button type="submit">Submit</button>
      </form>
      {/* {category === "+ Add Category" && (
        <CategoryForm onCategorySubmit={handleCategorySubmit} />
      )}

      <ProductForm onProductSubmit={handleProductSubmit} /> */}

      {/* Conditionally render VendorTopSection */}
      {/* {businessID && <VendorTopSection businessID={businessID} getToken={getToken} />} */}
    </div>
  );
};

export default VendorRegistrationForm;
