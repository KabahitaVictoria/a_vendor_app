import DashNav from "../../components/UserDashboardComponents/DashNav";
import VendorSecNav from "../../components/vendor_components/VendorSecNav";
import Hero from "../../components/LandingPageComponents/Hero";
import MainSection from "../../components/LandingPageComponents/MainSection";
import { VendorDashMain } from "../../components/vendor_components/VendorDashMain";

const VendorDash = () => {
    return (
        <div className="vendor-dashboard">
            <DashNav />
            <VendorSecNav />
            <VendorDashMain />
        </div>
    )
}

export default VendorDash;