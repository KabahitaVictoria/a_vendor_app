import DashNav from "../components/UserDashboardComponents/DashNav";
import SecNav from "../components/SecNav";
import UpdateInfo from "../components/UpdateInfo";
import UserOrders from "../components/UserOrders";
import UserReviews from "../components/UserReviews";
import "../styles/Account.css";

const AccountPage = () => {
 return (
   <div className="account-page">
     <DashNav />
     <SecNav />
     <div className="acc-main-section">
       <UpdateInfo />
       <div>
         <UserOrders />
         <UserReviews />
       </div>
     </div>
   </div>
 );
}

export default AccountPage;