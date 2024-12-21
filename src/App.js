import { Route, Routes } from "react-router-dom";
import Register from "./Pages/Auth/Register/Register";
import Login from "./Pages/Auth/Login/Login";
import Home from "./Pages/Home/Home";
import About from "./Pages/About/About";
import Profile from "./Pages/Seller/Profile/Profile";
import Service from "./Components/Service/Service";
import DisplayServices from "./Pages/Customer/DisplayServices";
import Details from "./Components/Service/Derails";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AddServiceForm from "./Components/Forms/AddServiceForm";




function App() {

  return (
    <div className="App">
      
        <ToastContainer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="profile" element={<Profile />} />
          <Route path="service" element={<DisplayServices />} />
          <Route path="serviceDetails" element={<Details />} />
          <Route path="add_service" element={<AddServiceForm />} />
        </Routes>
    
    </div>
  );
}

export default App;
