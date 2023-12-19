import DashNav from "../components/UserDashboardComponents/DashNav";
import Nav from "../components/Nav";
import SecNav from "../components/SecNav";
import "../styles/CategoriesPage.css";
import TopBizCard from "../components/LandingPageComponents/TopBizCard";

const BusinessCategoryPage = (props) => {
  const hasAccessToken = localStorage.getItem("access_token");

  return (
    <div className="categories-page">
      {hasAccessToken ? <DashNav /> : <Nav />}
      <SecNav />
      <div className="top">
        <img src={props.icon} alt="" />
        <h1>{props.title}</h1>
      </div>
      <div className="category-businesses">
        {props.businesses && props.businesses.length > 0 ? (
          props.businesses.map((business) => {
            return (
              <TopBizCard
                key={business.id}
                name={business.bus_name}
                id={business.id}
                user_id={business.user_id}
              />
            );
          })
        ) : (
          <p>No businesses in this category yet</p>
        )}
      </div>
    </div>
  );
};

export default BusinessCategoryPage;