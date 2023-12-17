import Nav from "../../components/Nav"
import DashNav from "../../components/UserDashboardComponents/DashNav"
import VendorSecNav from "../../components/vendor_components/VendorSecNav"
import VendorRegistrationForm from "../../components/vendor_components/VendorRegistrationForm"
import "../../styles/VendorRegistration.css"

const VendorRegistrationPage = () => {
    return (
        <div className="container">
            <DashNav />
            <VendorSecNav/>
            <VendorRegistrationForm />
        </div>
    )

}

export default VendorRegistrationPage