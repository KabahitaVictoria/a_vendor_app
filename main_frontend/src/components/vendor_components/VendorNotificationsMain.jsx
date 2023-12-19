import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

const VendorNotificationsMain = () => {
  const [notifications, setNotifications] = useState([]);
  const { businessId } = useParams();

  const getToken = () =>
    localStorage.getItem("access_token")
      ? JSON.parse(localStorage.getItem("access_token"))
      : null;

  useEffect(() => {
    // Fetch the details of the product to be updated and set the state
    fetch(`http://localhost:5000/notifications/${businessId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const notifData = data;
        console.log(notifData);
        setNotifications(notifData.notifications);
      })
      .catch((err) => console.log(err));
  }, [businessId]);

  return (
    <div className="">
      {/* <p>No notifications yet...</p> */}
      {notifications.map((notif) => {
        return (
          <Box
            className="notif-card"
            key={notif.id}
            border="1px solid"
            width="fit-content"
            padding="1rem"
            display="flex"
            flexDirection="column"
            alignItems="center"
            margin=".5rem"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              User Name:{" "}
              <b>
                {notif.user.first_name} {notif.user.last_name}
              </b>
            </Box>
            <Box marginBottom=".75rem"></Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              Contact: <b>{notif.user.contact}</b>
            </Box>
            <Box marginBottom=".75rem"></Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              Email: <b>{notif.user.email}</b>
            </Box>
            <Box marginBottom=".75rem"></Box>

            <Box display="flex" flexDirection="column" alignItems="center">
              Product: <b>{notif.product.name}</b>
            </Box>
            <Box marginBottom=".75rem"></Box>
            
            <p>{notif.description}</p>
          </Box>
        );
      })}
    </div>
  );
};

export default VendorNotificationsMain;
