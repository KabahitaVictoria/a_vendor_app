import "../../styles/TopBizSection.css";
import TopBizCard from "./TopBizCard";
import { Link, useNavigate, useParams } from "react-router-dom";

const TopBizSection = (props) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const onSeeMoreClick = () => {
    navigate(props.url);
  };

  const onBusinessClick = (businessId) => {
    setSelectedBusinessId(businessId);
  };

  return (
    <div className="top-biz-section">
      <h2>
        <span>{props.title}</span>
      </h2>
      <div className="business-section">
        {props.products && props.products.length > 0 ? (
          // Map over the products if there are products
          props.products.map((business) => (
              <TopBizCard
                key={business.id}
                name={business.bus_name}
                id={business.id}
                user_id={business.user_id}
                // Add any other props you need
              />
          ))
        ) : (
          // Display a message if there are no products
          <p>No products in this category yet</p>
        )}
        {/* <button onClick={onSeeMoreClick}>
          <span>See More</span>
        </button> */}
      </div>
    </div>
  );
};

export default TopBizSection;
