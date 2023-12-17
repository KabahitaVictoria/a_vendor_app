import { Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";


const ProductCard = (props) => {
  const navigate = useNavigate();
  const { businessId, id, customerId } = useParams();

  const onClickUpdate = () => {
    // Call the onClickUpdate function with the productId
    props.onClickUpdate(props.productId);
  };

  const onClickDelete = () => {
    props.onClickDelete(props.productId);
  }

  const onClickOrder = () => {
    navigate(
      `/dashboard/business/${businessId}/single_product/${props.productId}/vendor/${id}/customer/${customerId}`
    );
  }

  return (
    <div className="pdt-card top-biz-card" id="pdt-card">
      {/* <img src={props.image} alt="" /> */}
      <h3>{props.name}</h3>
      <div className="">
        <p className="bold">Price:</p>
        <p>ugx. {props.price} @</p>
      </div>
      <div className="">
        <p className="bold">Quantity:</p>
        <p>{props.quantity} packets</p>
      </div>
      <div className="">
        <p className="description">{props.description}</p>
      </div>
      <div className="product-buttons">
        {props.userType === "vendor" ? (
          <>
            <Button onClick={onClickUpdate} id="update-button">
              Update
            </Button>
            <Button id="delete-button" onClick={props.handleClickOpen}>
              Delete
            </Button>
          </>
        ) : (
          <button>Order</button>
        )}

        {/* Delete Confirmation Dialog */}
        <Dialog open={props.open} onClose={props.handleClose}>
          <DialogTitle>{"Delete Product"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this product?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={onClickDelete} color="primary" autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductCard;