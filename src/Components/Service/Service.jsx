import { Link, useParams } from "react-router-dom";
import "./Service.scss";
import { useUser } from "../../Context/UserProvider";
import { toast } from "react-toastify";
import { arrayRemove, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
export const truncateDescription = (description) => {
  const words = description.split(" ");
  if (words.length > 10) {
    return words.slice(0, 10).join(" ") + "...";
  }
  return description;
};
export default function Service({ data }) {
  const { user } = useUser();
  const [refresh, setRefresh] = useState(false);

  // console.log(data);
  useEffect(() => {
    if (refresh) {
      window.location.reload();
    }
  }, [refresh]);
  // console.log(data)
  // Delete The Spedific Service
  const handleDeleteService = async (index) => {
    const currentUser = auth.currentUser;
    const dataRef = doc(db, "Users", currentUser.uid); // Reference to the data document

    // Assuming `services[index]` is the service object you want to delete
    const serviceToDelete = data.services[index]; // Get the service to delete

    try {
      await updateDoc(dataRef, {
        services: arrayRemove(serviceToDelete), // Remove the service from the array
      });
      setRefresh((prev) => !prev);
      setTimeout(() => setRefresh(false), 5000);
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
        {data && data.services && data.services.length > 0 ? ( // Check if data and services are defined
          data.services.map((box, index) => (
            <div className="box" key={index}>
              <div className="data">
                {box.pictures && box.pictures.length > 0 ? ( // Check if pictures array is defined and has elements
                  <img src={box.pictures[0]} alt="" /> // Access the first picture safely
                ) : (
                  <img
                    src="./mediaconsole.log('Service component rendered');
console.log('User data:', data);
console.log('User services:', data.services);/defaultService.jpg"
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
                  <a href={data && data.linkedin}>
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
                {/* <Link to="/serviceDetails">
                  <button style={{ marginRight: "20px" }}>Details</button>
                </Link> */}

                {user.role === "Seller" && (
                  <button onClick={() => handleDeleteService(index)}>
                    Delete
                  </button>
                )}
                {/* {console.log(data)} */}
              </div>
            </div>
          ))
        ) : (
          <p>No services available.</p> // Display a message if no services are found
        )}
      </div>
    </div>
  );
}
