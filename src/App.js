import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Profile from "./Pages/Profile/Profile";
import DisplayServices from "./Pages/Customer/DisplayServices";
import Details from "./Components/Service/Derails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddServiceForm from "./Pages/Seller/AddService";
import VisitProfile from "./Pages/Customer/VisitProfile";
import SellerRoutes from "./RouteProtection/SellerRoutes";
import CustomerRoutes from "./RouteProtection/CustomerRoutes";
import Favorites from "./Pages/Customer/Favorites";

function App() {
  
  return (
    <div className="App">
      {/* Pop up messages */}
      <ToastContainer /> 



      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
        <Route path="profile" element={<Profile />} />

        <Route path="serviceDetails/:id" element={<Details />} />

        {/* Pages For Customer Only */}
        <Route path="customer" element={<CustomerRoutes />}>
          <Route path="services" element={<DisplayServices />} />
          <Route path="favorites" element={<Favorites />} />
        </Route>

        {/* Pages For Seller Only */}
        <Route path="seller" element={<SellerRoutes />}>
          <Route path="add_service" element={<AddServiceForm />} />
        </Route>
        
        <Route path="seller/profile/:id" element={<VisitProfile />} />
      </Routes>



    </div>
  );
}

export default App;
