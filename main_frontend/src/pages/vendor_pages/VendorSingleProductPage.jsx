import DashNav from "../../components/UserDashboardComponents/DashNav";
import SecNav from "../../components/SecNav";
import ProductNav from "../../components/ProductNav";
import SinglePdtVendorMain from "../../components/vendor_components/SinglePdtVendorMain";
import "../../styles/SingleProductPage.css";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const VendorSingleProductPage = () => {
    const [productData, setProductData] = useState([]);
    const [business, setBusiness] = useState([]);
    const { businessId, productId, id } = useParams();
    // const navigate = useNavigate();

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
          console.log("Product Data: ", productData);
          setProductData(productData);
        })
        .catch((err) => console.log(err));
    }, [productId]);

    useEffect(() => {
      fetch(`http://localhost:5000/businesses/business/${businessId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBusiness(data.data);
          console.log("Business Data:", data.data);
        })
        .catch((err) => console.log(err));
    }, [businessId]);
    return (
      <div className="vendor-single-product-page">
        <DashNav />
        <SecNav />
        <ProductNav
          bus_name={business.bus_name}
          productName={productData.name}
        />
        <SinglePdtVendorMain />
      </div>
    );
}

export default VendorSingleProductPage;