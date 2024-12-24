import { Link } from "react-router-dom";
import { truncateDescription } from "../../Components/Service/Service";
import { useUser } from "../../Context/UserProvider";
import { auth } from "../../Firebase/firebase";
import Header from "../../Components/Header/Header";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";


export default function Favorites() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]); // State to hold favorites
  const currentUser = auth.currentUser;

  useEffect(() => {
    // Load favorites from local storage on component mount
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const handleDeleteFavorite = (userId, index) => {
    // Filter out the service to be deleted
    const updatedFavorites = favorites.filter((box) => box.userId !== userId || box.index !== index);
    
    // Update the state and local storage
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    
    // Optionally, show a toast notification
    toast.success("Service removed from favorites", {
      position: "top-center",
    });
  };
  return (
    <>
      <Header />
      <div className="team-member" id="team">
        <h2 className="main-title" style={{ marginBottom: "40px" }}>
          Favorites Services
        </h2>
        <div className="container">
          { ( // Check if data and services are defined
            favorites.map((box, index) => (
              <div className="box" key={index}>
                <div className="data">
                  {box.pictures && box.pictures.length > 0 ? ( // Check if pictures array is defined and has elements
                    <img src={box.pictures[0]} alt="" /> // Access the first picture safely
                  ) : (
                    <img src="./media/defaultService.jpg" alt="Default" /> // Fallback image if no pictures are available
                  )}
                  <div className="icons">
                    <a href="//">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                    <a href="//">
                      <i className="fa fa-twitter"></i>
                    </a>
                    <a href={box && box.linkedin}>
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
                <div className="btns" >
                <Link to={`/serviceDetails/${box.userId}&${box.index}`}>
                      <button>Details</button>
                    </Link>

                    <Link to={`/seller/profile/${box.userId}`}>
                        <button>Seller</button>
                      </Link>
                    <button className="del"  onClick={() => handleDeleteFavorite(box.userId, box.index)}><i class="fa fa-trash"></i></button>
                </div>
                  
                </div>
              </div>
            ))
        )}
         {favorites.length === 0 && <p className="empty">Empty</p>}
        </div>
      </div>
    </>
  );
}
