import "../../styles/CategoriesCard.css";

const CategoriesCard = (props) => {
    return (
      <div className="categories-card">
        <div>
          <img src={props.src} alt="" />
          <p>{props.name}</p>
        </div>
      </div>
    );
}

export default CategoriesCard;