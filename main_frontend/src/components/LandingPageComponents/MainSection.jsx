import "../../styles/MainSection.css";
import TopBizSection from "./TopBizSection";
import Ads from "../Ads";

const MainSection = ({ businessCategories }) => {

  return (
    <div className="main-section">
      <div className="top-businesses">
        <h2>
          <span>Businesses In...</span>
        </h2>
        {businessCategories &&
          businessCategories.map((category) => (
            <TopBizSection
              key={category.id}
              title={category.name}
              products={category.products}
              // Add any other props you need
            />
          ))}
      </div>
      <Ads />
    </div>
  );
};

export default MainSection;