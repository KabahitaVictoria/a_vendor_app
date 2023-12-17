import "../../styles/UpdateInfo.css";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const SinglePdtVendorMain = () => {
  const [productData, setProductData] = useState([]);
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const { businessId, productId, id } = useParams();
  const navigate = useNavigate();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

    useEffect(() => {
      // Fetch the details of the product to be updated and set the state
      fetch(`http://localhost:5000/products/product/${productId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          const productData = data.data;
          setProductData(productData);
          setQuantity(productData.quantity);
          setPrice(productData.price);
          setDescription(productData.description);
        })
        .catch((err) => console.log(err));
    }, [productId]);

    const handleUpdateProductSubmit = (e) => {
      e.preventDefault();

      const updatedProductData = {
        quantity: quantity,
        price: price,
        description: description,
      };

      fetch(`http://localhost:5000/products/update/${productId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(updatedProductData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Product updated successfully:", data);
          // Handle success, e.g., redirect or display a success message
          navigate(`/dashboard/business_profile/${businessId}/vendor/${id}`);
        })
        .catch((error) => {
          console.error("Error updating product:", error);
          // Handle error, e.g., display an error message to the user
        });
    };

  return (
    <div className="single-product-vendor-main">
      <div className="product-main-section">
        {/* <div className="see-product-section">
          <div className="heading">
            <h3>Product Video</h3>
            <input type="file" className="custom-file-input" />
          </div>
          <video
            id="my-video"
            className="video-js"
            controls
            preload="auto"
            width="640"
            height="264"
            poster="/video/thumbnail.jpg"
            data-setup="{}"
          >
            <source src="/video/videoplayback.mp4" type="video/mp4" />
            <p className="vjs-no-js">
              To view this video please enable JavaScript, and consider
              upgrading to a web browser that
              <a
                href="https://videojs.com/html5-video-support/"
                target="_blank"
              >
                supports HTML5 video
              </a>
            </p>
          </video>
        </div> */}
        <form action="" id="update-pdt-form" className="product-user-order" onSubmit={handleUpdateProductSubmit}>
          <div className="product-update-form">
            {/* <label htmlFor="product-name" className="update-info-labels">
              <b>Product Name</b>
              
            </label> */}
            {/* <input
              type="text"
              placeholder="Enter New Product Name"
              name="product-name"
            ></input> */}
            <h2>
              <b className="current">{productData.name}</b>
            </h2>

            <label htmlFor="product-price" className="update-info-labels">
              <b>Product Price</b>
              <p>
                <b className="current">current:</b> {productData.price} @
              </p>
            </label>
            <input
              type="number"
              placeholder="Enter New Product Price"
              name="product-price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            ></input>
            <label htmlFor="product-stock" className="update-info-labels">
              <b>Quantity in Stock</b>
              <p>
                <b className="current">current:</b> {productData.quantity}
              </p>
            </label>
            <input
              type="number"
              placeholder="Enter New Product Stock"
              name="product-stock"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            ></input>

            <label htmlFor="product-description" className="update-info-labels">
              <b>Description</b>
            </label>
            <textarea
              name="product-description"
              id=""
              cols="30"
              rows="10"
              placeholder={productData.description}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <input type="submit" value="Update Information" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SinglePdtVendorMain;
