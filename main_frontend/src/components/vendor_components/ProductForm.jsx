import { useState } from "react";

export const ProductForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [video, setVideo] = useState("");

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Check if both image and video are provided or neither is provided
    if ((image && video) || (!image && !video)) {
      // Display an error message or take appropriate action
      console.error(
        "Provide either an image URL or a video URL, not both or none"
      );
      return;
    }

    // Create an object with the form data
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image); // append the actual file object
    formData.append("video", video);

    // TODO: Perform the API call to send productData to the server
    // For example, using fetch or axios
    fetch("http://127.0.0.1:5000/products/create", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));

    console.log("Product Data:", formData);
  };

  return (
    <div className="upload-product">
      <h3>Upload a Product</h3>
      <form
        onSubmit={handleFormSubmit}
        className="product-user-order"
        id="product-upload-form"
      >
        <label className="update-info-labels">
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <br />

        <label className="update-info-labels">
          Price:
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </label>
        <br />

        <label className="update-info-labels">
          Quantity:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />
        </label>
        <br />

        <label className="update-info-labels">
          Image URL:
          <input
            type="file"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>
        <br />

        <label className="update-info-labels">
          Video URL:
          <input
            type="file"
            value={video}
            onChange={(e) => setVideo(e.target.value)}
          />
        </label>
        <br />

        {/* Add more fields as needed */}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ProductForm;
