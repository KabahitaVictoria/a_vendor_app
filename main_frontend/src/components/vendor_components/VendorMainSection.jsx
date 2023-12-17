import Ads from "../Ads";
import ProductSection from "../BusinessProfileComponents/ProductSection";
import "../../styles/BizMainSection.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@mui/material";

const VendorMainSection = ({ userType }) => {
  const { businessId, id } = useParams();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  // const getToken = () =>
  //   localStorage.getItem("access_token")
  //     ? JSON.parse(localStorage.getItem("access_token"))
  //     : null;

  useEffect(() => {
    // Fetch existing categories from the server
    fetch(`http://localhost:5000/categories/${businessId}/`, {
      method: "GET",
      headers: {
        // Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data || []);
        console.log("categories data:", data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  function onAddProductClick() {
    console.log("ID:", id);
    navigate(`/dashboard/business/${businessId}/upload_product/vendor/${id}`);
  }

  return (
    <div className="biz-main-section">
      <div className="main-content">
        <div className="biz-main-content">
          {/* <div className="main-content-div">
            <div className="vendor-video-heading">
              <h3>Take a tour into our shop...</h3>
              <input type="file" id="custom-file-input" />
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
          <div className="main-content-div">
            <div className="products-heading">
              <h3>Our Products</h3>
              {userType == "vendor" ? (
                <button onClick={onAddProductClick}>Add New Product</button>
              ) : (
                <p></p>
              )}
            </div>
            <div className="" id="biz-pdts">
              {categories.map((category) => (
                <ProductSection
                  key={category.id}
                  title={category.name}
                  products={category.products} // Pass the products associated with the category
                  userType={userType}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <Ads />
    </div>
  );
};

export default VendorMainSection;
