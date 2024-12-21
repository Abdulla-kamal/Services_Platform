import { Link } from "react-router-dom";
import "./Service.scss";
import { useUser } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
export default function Service() {
  const { user } = useUser();
const [refresh, setRefresh] = useState(false);
  console.log(user);
useEffect(()=>{
  // window.location.reload();
},[refresh])
  const truncateDescription = (description) => {
    const words = description.split(" ");
    if (words.length > 10) {
      return words.slice(0, 10).join(" ") + "...";
    }
    return description;
  };



  // Delete The Spedific Service
  const handleDeleteService = async (index) => {
    const currentUser = auth.currentUser;
    const userRef = doc(db, "Users", currentUser.uid); // Reference to the user document
   
    // Assuming `services[index]` is the service object you want to delete
    const serviceToDelete = user.services[index]; // Get the service to delete

    try {
      await updateDoc(userRef, {
        services: arrayRemove(serviceToDelete), // Remove the service from the array
      });
    setRefresh(prev=>!prev)
      toast.success("Service deleted successfully", {
        position: "top-center",
      });
      // Optionally, update local state or redirect
    } catch (error) {
      console.error("Error deleting service: ", error);
      toast.error("Failed to delete service", {
        position: "top-center",
      });
    }
  };

  return (
    <div className="team-member" id="team">
      <h2 className="main-title" style={{ marginBottom: "40px" }}>
        Services
      </h2>
      <div className="container">
        {user &&
          user.services.map((box, index) => (
            <div className="box" key={index}>
              <div className="data">
                <img src={box.picture_1} alt="" />
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
                <Link to="/serviceDetails">
                  <button style={{ marginRight: "20px" }}>Details</button>
                </Link>
                {user.role === "Customer" && <button>Seller</button>}
                {user.role === "Seller" && (
                  <button onClick={() => handleDeleteService(index)}>
                    Delete
                  </button>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
