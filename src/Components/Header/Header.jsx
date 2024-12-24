import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import { auth } from "../../Firebase/firebase";
import { useUser } from "../../Context/UserProvider";
import Cookies from "universal-cookie";
import Loading from "../Effects/Loading";
export default function Header() {
  const { user } = useUser();

  const navigate = useNavigate();
  async function handleLogout() {
    try {
      navigate("/login");
      await auth.signOut(); // Sign out from Firebase
      Cookies.remove("token"); // Remove the token from cookies
      console.log("User logged out successfully");
    } catch (e) {
      console.log(e.message);
    }
  }

  return (
    <div className="header">
      <div className="container">
        <a href="//" className="logo">
          Freelancing
        </a>

        <ul className="main-nav">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          {user && user.role !== "Seller" && (
            <>
              <li>
                <Link to="/customer/services">Services</Link>
              </li>
              <li>
                <Link to="/customer/favorites">Favorites</Link>
              </li>
            </>
          )}
          {user && (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              {user && user.role !== "Customer" && (
                <li>
                  <Link to="/seller/add_service">Add Service</Link>
                </li>
              )}
            </>
          )}
          <li style={{ paddingTop: user && "15px" }}>
            {user ? (
              <button style={{ margin: "0" }} onClick={handleLogout}>
                Logout
              </button>
            ) : (
              <Link to="/login">Sign in</Link>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
}
