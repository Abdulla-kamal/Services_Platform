import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import Service from "../../Components/Service/Service";
import "./Profile.scss";
import { auth, db } from "../../Firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import Loading from "../../Components/Effects/Loading";
import { useUser } from "../../Context/UserProvider";

export default function Profile() {
  const { user } = useUser();
  // console.log(user)
  return (
    <>
      {user ? (
        <>
          <Header />
          <div class="testimonails" id="testimonails">
            <div className="comtainer">
              <div className="person">
                <div className="image">
                  {user.picture ? (
                    <img src={user && user.picture} alt="" />
                  ) : (
                    <img src="./media/youssif.png" alt="" />
                  )}
                </div>
                <h2>{user && user.name}</h2>
                {user && user.role === "Seller" ? (
                  <span>Seller</span>
                ) : (
                  <span>Customer</span>
                )}

                <p>{user && user.description}</p>
                <div className="soc">
                  <div className="social">
                    <a href="http://">
                      <img src="./media/twitter.png" alt="" />
                    </a>
                    <a href="http://">
                      <img src="./media/facebook.png" alt="" />
                    </a>
                    <a href={user && user.linkedin}>
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
             {user && user.role !=="Customer" && (user.services && <Service data={user} />)}
            </div>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
