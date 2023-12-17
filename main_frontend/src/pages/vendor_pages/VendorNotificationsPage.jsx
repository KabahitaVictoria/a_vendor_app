import Nav from "../../components/Nav";
import VendorSecNav from "../../components/vendor_components/VendorSecNav";
import VendorNotificationsMain from "../../components/vendor_components/VendorNotificationsMain";

const VendorNotificationsPage = () => {
    return (
      <div className="vendor-notif-page">
        <Nav />
        <VendorSecNav />
        <VendorNotificationsMain />
      </div>
    );
}

export default VendorNotificationsPage;