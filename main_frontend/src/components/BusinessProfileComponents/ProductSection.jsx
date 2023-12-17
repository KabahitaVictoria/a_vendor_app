import ProductCard from "./ProductCard";
import "../../styles/ProductSection.css";
import "../../styles/TopBizSection.css";
// import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

const ProductSection = (props) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { businessId, id } = useParams();
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const onClickUpdate = (productId) => {
    // Navigate to the update page with the productId
    console.log("Update button clicked for productId:", productId);
    // Add the logic to navigate to the update page here
    navigate(
      `/dashboard/business/${businessId}/single_product/${productId}/vendor/${id}`
    );
  };

  const onClickDelete = (productId) => {
    // Add logic to fetch the delete endpoint
    console.log("Deleting product with id:", productId);

    fetch(`http://localhost:5000/products/delete/${productId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully:", data);
        // Handle success, e.g., redirect or display a success message
        navigate(`/dashboard/business_profile/${businessId}/vendor/${id}`);
        handleClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        // Handle error, e.g., display an error message to the user
      });

    // Close the dialog after the delete action
    handleClose();
  };

  return (
    <div className="product-section">
      <h3>
        <span>{props.title}</span>
      </h3>
      <div className="business-section">
        {props.products.map((product) => (
          <ProductCard
            key={product.id}
            name={product.name}
            quantity={product.quantity}
            price={product.price}
            description={product.description}
            productId={product.id}
            onClickUpdate={onClickUpdate}
            onClickDelete={onClickDelete}
            handleClose={handleClose}
            handleClickOpen={handleClickOpen}
            open={open}
            userType={props.userType}
          />
        ))}
        {/* <button>
          <span>
            <a href="/dashboard/business_products">See More</a>
          </span>
        </button> */}
      </div>
    </div>
  );
};

export default ProductSection;
