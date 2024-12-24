import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Service, { truncateDescription } from "../../Components/Service/Service";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Loading from "../../Components/Effects/Loading";
import { Link } from "react-router-dom";
import { useUser } from "../../Context/UserProvider";
import { toast } from "react-toastify";

export default function DisplayServices() {
  const { user } = useUser();
  console.log(user);
  const [allServices, setAllServices] = useState([]); // State to hold all services
  const [loading, setLoading] = useState(true); // State to manage loading
  const [favorites, setFavorites] = useState([]); // State to hold favorites

  console.log(allServices);
  useEffect(() => {
    const fetchAllServices = async () => {
      try {
        const usersCollection = collection(db, "Users"); // Reference to the Users collection
        const usersSnapshot = await getDocs(usersCollection); // Get all users
        const servicesArray = [];

        usersSnapshot.forEach((doc) => {
          const userData = doc.data();
          if (userData.services && userData.services.length > 0) {
            userData.services.forEach((service) => {
              servicesArray.push({ ...service, userId: doc.id }); // Add userId to each service
            });
          }
        });

        setAllServices(servicesArray); // Set the state with all services
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchAllServices(); // Call the function to fetch services
  }, []);

  const handleFavorite = (service, serviceIndex) => {
    //  Add Favorites
    let updatedFavorites = [...favorites, { ...service, index: serviceIndex }];

    setFavorites(updatedFavorites); // Update state
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites)); // Update local storage
    toast.success("Service added to the favorite", {
      position: "top-center",
      className:"custom-toast"
    });
  };

  return (
    <>
      <Header />
      {loading ? (
        <Loading /> // Show loading message
      ) : allServices.length > 0 ? (
        <div className="team-member" id="team">
          <h2 className="main-title" style={{ marginBottom: "40px" }}>
            Services
          </h2>
          <div className="container">
            {allServices.map((box, index) => (
              <div className="box" key={index}>
                {console.log(box.userId)}
                <div className="data">
                  {box.pictures && box.pictures.length > 0 ? ( // Check if pictures array is defined and has elements
                    <img src={box.pictures[0]} alt={box.name} /> // Access the first picture safely
                  ) : (
                    <img
                      src="./defaultService.jpg" // Corrected the path to the default image
                      alt="Default"
                    /> // Fallback image if no pictures are available
                  )}
                  <div className="icons">
                    <a href="//">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                    <a href="//">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href={user && user.linkedin}>
                      <i className="fa fa-linkedin"></i>
                    </a>
                    <a href="//">
                      <i className="fa fa-youtube"></i>
                    </a>
                  </div>
                </div>
                <div className="info" style={{ padding: "10px" }}>
                  <h3 style={{ marginTop: "20px" }}>{box.name}</h3>
                  <p>{truncateDescription(box.description)}</p>
                  <div className="btns">
                    <Link to={`/serviceDetails/${box.userId}&${index}`}>
                      <button>Details</button>
                    </Link>
                    {
                      <Link to={`/seller/profile/${box.userId}`}>
                        <button>Seller</button>
                      </Link>
                    }
                    {user.role === "Customer" && (
                      <button
                        className="fav"
                        onClick={() => handleFavorite(box, index)}
                      >
                        <i class="fa fa-heart"></i>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="empty">Empty.</p> // Display a message if no services are found
      )}
    </>
  );
}
