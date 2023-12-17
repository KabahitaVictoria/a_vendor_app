import { Box, Button } from "@mui/material";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";


const ProductCard = (props) => {
  const [openDialog, setOpenDialog] = useState(false);
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

  const handleOrderButtonClick = () => {
    const accessToken = localStorage.getItem("access_token");

    if (!accessToken) {
      // Show the dialog box
      setOpenDialog(true);
    } else {
      // Redirect to the order page
      onClickOrder();
    }
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  const handleDialogLoginClick = () => {
    handleDialogClose();
    navigate("/login_or_register/login");
  };


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
            <Box paddingRight=".05rem">
              <Button onClick={onClickUpdate} id="update-button">
                Update
              </Button>
            </Box>
            <Box paddingLeft=".1rem">
              <Button id="delete-button" onClick={props.handleClickOpen}>
                Delete
              </Button>
            </Box>
          </>
        ) : (
          <button onClick={handleOrderButtonClick}>Order</button>
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

        {/* order dialog box */}
        <Dialog open={openDialog} onClose={handleDialogClose}>
          <DialogTitle>{"Please Log In"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To place an order, you need to log in.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Cancel
            </Button>
            <Button onClick={handleDialogLoginClick} color="primary" autoFocus>
              Log In
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default ProductCard;