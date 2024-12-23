import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase/firebase";
import Loading from "../../Components/Effects/Loading";
import Header from "../../Components/Header/Header";
import Service from "../../Components/Service/Service";

export default function VisitProfile() {
  const { pathname } = useLocation(); // Get The Path
  const pathhArray = pathname.split("/"); // Convert The Path to Array
  const userId = pathhArray[pathhArray.length - 1]; // Get userId from URL
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDoc = doc(db, "Users", userId); // Reference to the specific user document
        const userSnapshot = await getDoc(userDoc);

        if (userSnapshot.exists()) {
          setUserData(userSnapshot.data()); // Set user data
        } else {
          console.log("No such user!");
        }
      } catch (error) {
        console.error("Error fetching user data: ", error);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchUserData(); // Call the function to fetch user data
  }, [userId]);
  return (
    <>
      {loading ? (
        <Loading /> // Show loading message
      ) : userData ? (
        <>
          <Header />
          <div className="testimonails" id="testimonails">
            <div className="comtainer">
              <div className="person">
                <div className="image">
                  {userData.picture ? (
                    <img src={userData && userData.picture} alt="" />
                  ) : (
                    <img src="./media/youssif.png" alt="" />
                  )}
                </div>
                <h2>{userData && userData.name}</h2>
                {userData && userData.role === "Seller" ? (
                  <span>Seller</span>
                ) : (
                  <span>Customer</span>
                )}

                <p>{userData && userData.description}</p>
                <div className="soc">
                  <div className="social">
                    <a href="http://">
                      <img src="./media/twitter.png" alt="" />
                    </a>
                    <a href="http://">
                      <img src="./media/facebook.png" alt="" />
                    </a>
                    <a href={userData && userData.linkedin}>
                      <img src="./media/linkedin.png" alt="" />
                    </a>
                    <a href="http://">
                      <img src="./media/pinterest.png" alt="" />
                    </a>
                    <a href="http://">
                      <img src="./media/instagram.png" alt="" />
                    </a>
                  </div>
                </div>
              </div>
              {userData.services && <Service data={userData} />}
            </div>
          </div>
        </>
      ) : (
        <p>User not found.</p> // Message if user data is not found
      )}
    </>
  );
}
