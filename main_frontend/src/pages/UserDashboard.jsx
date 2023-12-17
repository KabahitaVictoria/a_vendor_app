import Hero from "../components/LandingPageComponents/Hero";
import MainSection from "../components/LandingPageComponents/MainSection";
import DashNav from "../components/UserDashboardComponents/DashNav";
import SecNav from "../components/SecNav";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const UserDashboard = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [businessCategories, setBusinessCategories] = useState([]);

    const getToken = () =>
      localStorage.getItem("access_token")
        ? JSON.parse(localStorage.getItem("access_token"))
        : null;

    useEffect(() => {
      // Fetch existing categories from the server
      fetch(`http://localhost:5000/business_categories/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setBusinessCategories(data.data || []);
          console.log("business categories data:", data.data);
        })
        .catch((err) => console.log(err));
    }, []);

  return (
    <div className="user-dashboard">
      <DashNav />
      <SecNav />
      <Hero />
      <MainSection businessCategories={businessCategories} />
    </div>
  );
};

export default UserDashboard;
