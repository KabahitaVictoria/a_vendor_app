import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@mui/material";

const TopBizCard = (props) => {
    const navigate = useNavigate();
    const { customerId } = useParams();

    function onBusinessButtonClick() {
        if (customerId !== undefined) {
          // If customerId is defined, navigate to the customer-specific route
          navigate(
            `/dashboard/business_profile/${props.id}/vendor/${props.user_id}/customer/${customerId}`
          );
        } else {
          // If customerId is undefined, navigate to the general vendor route
          navigate(
            `/dashboard/business_profile/${props.id}/vendor/${props.user_id}`
          );
        }
    }

    return (
      <div className="top-biz-card" id="business-card">
        <img src="/video/thumbnail.jpg" alt="" />
        <p className="name">{props.name}</p>
        <Button onClick={onBusinessButtonClick}>
          See Business
        </Button>
      </div>
    );
}

export default TopBizCard;