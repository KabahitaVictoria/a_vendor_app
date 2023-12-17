import DashNav from "../../components/UserDashboardComponents/DashNav";
import Nav from "../../components/Nav";
import VendorSecNav from "../../components/vendor_components/VendorSecNav";
import VendorTopSection from "../../components/vendor_components/VendorTopSection";
import VendorMainSection from "../../components/vendor_components/VendorMainSection";
import VendorRatingSection from "../../components/vendor_components/VendorRatingSection";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

const VendorProfilePage = () => {
  const [business, setBusiness] = useState([]);
  const { businessId, id } = useParams();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  const getUserType = () => {
    return localStorage.getItem("user_type")
      ? JSON.parse(localStorage.getItem("user_type"))
      : null;
  }

  // console.log(businessId);
  console.log("User Type:", getUserType());

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
  }, [businessId])

  return (
    <div className="business-profile-page">
      {getToken() ? <DashNav /> : <Nav />}
      <VendorSecNav />
      <VendorTopSection
        icon={business.icon}
        bus_name={business.bus_name}
        description={business.description}
        email={business.email_addr}
        contact={business.phone}
      />
      <VendorMainSection userType={getUserType()} />
      {/* <VendorRatingSection /> */}
    </div>
  );
};

export default VendorProfilePage;
