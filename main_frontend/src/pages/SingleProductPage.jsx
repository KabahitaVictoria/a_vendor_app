import DashNav from "../components/UserDashboardComponents/DashNav";
import SecNav from "../components/SecNav";
import SinglePdtMain from "../components/SinglePdtMain";
import ProductNav from "../components/ProductNav";
import "../styles/SingleProductPage.css";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

const SingleProductPage = () => {
  const [productData, setProductData] = useState([]);
  const [business, setBusiness] = useState([]);
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
    <div className="single-product-page">
      <DashNav />
      <SecNav />
      <ProductNav bus_name={business.bus_name} productName={productData.name} />
      <SinglePdtMain productData={productData} />
    </div>
  );
};

export default SingleProductPage;
