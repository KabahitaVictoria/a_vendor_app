import Nav from "../components/Nav";
import SecNav from "../components/SecNav";
import Hero from "../components/LandingPageComponents/Hero";
import MainSection from "../components/LandingPageComponents/MainSection";
import { useEffect, useState } from "react";

const LandingPage = () => {
  const [businessCategories, setBusinessCategories] = useState([]);

  useEffect(() => {
    // Fetch existing categories from the server
    fetch(`http://localhost:5000/business_categories/`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        setBusinessCategories(data.data || []);
        console.log("business categories data:", data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  
  return (
    <div className="landing-page">
      <Nav />
      <SecNav />
      <Hero />
      <MainSection businessCategories={businessCategories} />
    </div>
  );
}

export default LandingPage;