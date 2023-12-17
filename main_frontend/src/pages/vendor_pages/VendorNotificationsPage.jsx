import DashNav from "../../components/UserDashboardComponents/DashNav"
import VendorSecNav from "../../components/vendor_components/VendorSecNav";
import VendorNotificationsMain from "../../components/vendor_components/VendorNotificationsMain";

const VendorNotificationsPage = () => {
    return (
      <div className="vendor-notif-page">
        <DashNav />
        <VendorSecNav />
        <VendorNotificationsMain />
      </div>
    );
}

export default VendorNotificationsPage;