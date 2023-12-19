import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SinglePdtMain = (props) => {
  const [orderQuantity, setOrderQuantity] = useState("");
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  function handleNotifyButtonClick(e) {
    e.preventDefault();

    const data = {
      user_id: props.customerId,
      product_id: props.productId,
      quantity: orderQuantity,
    };

    if (parseInt(orderQuantity) > parseInt(props.productData.quantity)) {
      alert(
        `Order quantity cannot be greater than the available product quantity. Please enter a value less than ${props.productData.quantity}`
      );
      return;
    }

    fetch(`http://localhost:5000/notifications/create/${props.businessId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        // Handle success, e.g., redirect or display a success message
        navigate(`/dashboard/business_profile/${props.businessId}/vendor/${props.id}`);
      })
      .catch((error) => {
        console.error("Error sending notification:", error);
        // Handle error, e.g., display an error message to the user
      });
  }

  return (
    <div className="single-product-main">
      <div className="product-main-section">
        <div className="product-user-order">
          <div className="product-name-and-price">
            <div className="">
              <h1>{props.productData.name}</h1>
              <h2>UGX.{props.productData.price} @</h2>
            </div>
            <div className="current-quantity">
              <p>
                <span>{props.productData.quantity}</span> packets currently in
                stock
              </p>
            </div>
          </div>
          <p>{props.productData.description}</p>
          <form action="" onSubmit={handleNotifyButtonClick}>
            <div>
              <label htmlFor="quantity">Quantity:</label>
              <input
                type="number"
                name=""
                id=""
                placeholder="Input a number"
                onChange={(e) => setOrderQuantity(e.target.value)}
                required
              />
            </div>
            <input type="submit" value="Notify Vendor" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default SinglePdtMain;
