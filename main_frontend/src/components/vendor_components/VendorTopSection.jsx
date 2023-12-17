import { useState } from "react";
import "../../styles/TopSection.css";
import { Rating } from "@mui/material";

const VendorTopSection = (props) => {

  return (
    <div className="hero-section" id="top-section">
      <div className="t">
        <div className="biz-pfp">
          <a href="/dashboard/account">
            <img src="/images/profile-user.png" alt="" id="biz-pfp-img" />
          </a>
        </div>
        <div className="biz-description">
          <div className="biz-heading-and-rating">
            <h2>{props.bus_name}</h2>
            {/* <a href="/dashboard/all_ratings">
              <Rating name="read-only" value={4} readOnly />
            </a> */}
          </div>
          <p>{props.description}</p>
          <div className="biz-location" id="biz-info">
            <div className="location-place">
              <p id="location">Location: </p>
              <p>Downtown Kampala</p>
            </div>
            <div className="location-place">
              <p id="location">Email: </p>
              <p>{props.email}</p>
            </div>
            <div className="location-place">
              <p id="location">Contact: </p>
              <p>{props.contact}</p>
            </div>
            {/* <button id="button-google-maps">Check Google Maps</button> */}
          </div>
          {/* <div className="search-bar">
            <form action="#">
              <input
                type="text"
                name="product-name"
                id="product-name"
                placeholder="Search Mama Maria's beauty shop"
              />
              <input type="submit" value="search" />
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default VendorTopSection;
