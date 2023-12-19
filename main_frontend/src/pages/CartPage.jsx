import DashNav from "../components/UserDashboardComponents/DashNav";
import SecNav from "../components/SecNav";
import "../styles/CartPage.css";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  DialogContentText,
} from "@mui/material";

const CartPage = () => {
  const [notifications, setNotifications] = useState([]);
  const [count, setCount] = useState(0);
  const { customerId } = useParams();
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [selectedNotifId, setSelectedNotifId] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogOpen2, setDialogOpen2] = useState(false);
  const [totalProductQty, setTotalProductQty] = useState(0);
  const [quantity, setQuantity] = useState("");

  const handleUpdateClick = (notification, stockQuantity, notifId) => {
    setSelectedNotification(notification);
    setTotalProductQty(stockQuantity);
    setDialogOpen(true);
    setSelectedNotifId(notifId);
  };

  const handleDeleteClick = (notification, notifId) => {
    setSelectedNotification(notification);
    setDialogOpen2(true);
    setSelectedNotifId(notifId);
  };

  const handleDialogClose = () => {
    setSelectedNotification(null);
    setDialogOpen(false);
    setDialogOpen2(false);
    setSelectedNotifId(null);
  };

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    // Fetch the details of the product to be updated and set the state
    fetch(
      `http://localhost:5000/notifications/user_notifications/${customerId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        const notifData = data;
        console.log("Notif Data", notifData);
        setNotifications(notifData.notifications);
        setCount(notifData.count);
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [customerId]);

  const handleUpdateQuantity = () => {
    const updatedQuantity = parseInt(
      document.getElementById("outlined-number").value
    );
    if (
      isNaN(updatedQuantity) ||
      updatedQuantity < 0 ||
      updatedQuantity > totalProductQty
    ) {
      alert("Invalid quantity entered.");
      return;
    }

    const updatedProductData = {
      quantity: quantity,
      description: `User has ordered ${quantity} packets.`,
    };

    fetch(`http://localhost:5000/notifications/update/${selectedNotifId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
      body: JSON.stringify(updatedProductData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product updated successfully:", data);
        handleDialogClose;
        alert("Product updated successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error updating product:", error);
        alert("Error updating product. Please try again!");
      });
  };

  const onDeleteClick = () => {
    fetch(`http://localhost:5000/notifications/delete/${selectedNotifId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Product deleted successfully:", data);
        alert("Product deleted successfully!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error deleting product:", error);
        alert("Error deleting product. Please try again!");
      });
  };

  return (
    <div className="cart-page">
      <DashNav />
      <SecNav />
      <div className="cart-main-section">
        <div className="cart-heading-section">
          {count === 0 ? (
            <h2>
              Your <span>SmallBizSafari</span> Cart is empty
            </h2>
          ) : (
            <>
              <h2>
                Your <span>SmallBizSafari</span> Cart
              </h2>
            </>
          )}
          <div className="cart-total-product-price">
            <h3>Sub-Total:</h3>
            <h2>UGX 0 [{count} Item(s)]</h2>
          </div>
        </div>

        {count === 0 ? (
          <div className="browse-button-div">
            <img src="/icons/cart-illustration.png"></img>
            <a href={`/dashboard/customer/${customerId}`}>
              Browse local businesses
            </a>
          </div>
        ) : (
          <Box display="flex" flexWrap="wrap">
            {notifications.map((notif) => {
              return (
                <Box
                  className="notif-card"
                  key={notif.id}
                  border="1px solid #0000008a"
                  width="fit-content"
                  padding="1rem 3rem"
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  margin=".5rem"
                >
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginBottom=".75rem"
                    alignItems="center"
                  >
                    PRODUCT: <b>{notif.product.name}</b>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginBottom=".75rem"
                    alignItems="center"
                  >
                    PRICE: <b>{notif.product.price}</b>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginBottom=".75rem"
                    alignItems="center"
                  >
                    QUANTITY IN STOCK:{" "}
                    <Box>
                      <b>{notif.product.quantity}</b> packets
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginBottom=".75rem"
                    alignItems="center"
                  >
                    ORDERED QUANTITY:{" "}
                    <Box>
                      <b>{notif.quantity}</b> packets
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    flexDirection="column"
                    marginBottom=".5rem"
                    alignItems="center"
                  >
                    BUSINESS: <b>{notif.business.bus_name}</b>
                  </Box>
                  <Box className="order-buttons" display="flex" margin=".5rem">
                    <>
                      <Box paddingRight=".05rem">
                        <Button
                          id="update-button"
                          style={{
                            border: "1px solid",
                            backgroundColor: "#fe9800",
                          }}
                          onClick={() =>
                            handleUpdateClick(
                              notif,
                              notif.product.quantity,
                              notif.id
                            )
                          }
                        >
                          <b>Update</b>
                        </Button>
                      </Box>
                      <Box paddingLeft=".1rem">
                        <Button
                          id="delete-button"
                          onClick={() => handleDeleteClick(notif, notif.id)}
                        >
                          <b>Delete</b>
                        </Button>
                      </Box>
                    </>
                  </Box>
                </Box>
              );
            })}
          </Box>
        )}
        {/* Dialog for updating quantity */}
        <Dialog open={dialogOpen} onClose={handleDialogClose}>
          <DialogTitle>Update Quantity</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Please put in a number less than {totalProductQty}
            </DialogContentText>
            <Box marginTop=".5rem"></Box>
            <TextField
              label="New Quantity"
              type="number"
              fullWidth
              defaultValue={selectedNotification?.quantity}
              id="outlined-number"
              onChange={(e) => setQuantity(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={handleUpdateQuantity}>Update</Button>
          </DialogActions>
        </Dialog>

        <Dialog open={dialogOpen2} onClose={handleDialogClose}>
          <DialogTitle>Delete Order</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Are you sure you want to delete this order?
            </DialogContentText>
            <Box marginTop=".5rem"></Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose}>Cancel</Button>
            <Button onClick={onDeleteClick}>Delete</Button>
          </DialogActions>
        </Dialog>
      </div>
      <footer>
        The price and availability of items at <span>SmallBizSafari</span> are
        subject to change. The Cart is a temporary place to store a list of your
        items and reflects each item's most recent price.
      </footer>
    </div>
  );
};

export default CartPage;
