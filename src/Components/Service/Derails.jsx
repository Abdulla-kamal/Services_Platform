import { doc, getDoc } from "firebase/firestore";
import Header from "../Header/Header";
import {  useParams } from "react-router-dom";
import { db } from "../../Firebase/firebase";
import { useEffect, useState } from "react";
import Gullery from "./Gullery";

export default function Details() {
  const [service, setService] = useState(null); //Local State 
  const {id} = useParams(); //Fetch the useId and Index Service from The link 
  const array = id.split('&'); //Split them
  const userId = array[0];
  const serviceIndex = array[1]


const fetchServiceDetails = async () => {
  try {
    const userDoc = doc(db, "Users", userId);
    const userSnapshot = await getDoc(userDoc);

    if (userSnapshot.exists()) {
      const services = userSnapshot.data().services; // Get the services array
      const specificService = services[serviceIndex]; // Get the specific service
      setService(specificService); // Set the specific service data in state
    } else {
      console.log("No such document!");
    }
  } catch (err) {
    console.log(err.message);
  }
};

useEffect(()=> {
  fetchServiceDetails();
}, [userId, serviceIndex]);

    return(
        <>
        <Header/>
        {service && service.pictures.length > 0 && <Gullery pictures = {service && service.pictures}/>}


        
        <div class="pricing" id="pricing">
      <img class="right" src="./media/dots.png" alt="" />
      <img class="left" src="./media/dots.png" alt="" />
      <h2 class="main-title">Details</h2>
      <div class="container">
        <div class="box">
          <h3>Basic</h3>
          <img src="Image/hosting-basic.png" alt="" />
          <span class="amount">Time</span>
          <ul>
            <li>Timeliness</li>
            <li>Reliability</li>
            <li>Efficiency</li>
            <li>Dependability</li>
            <li>Promptness</li>
          </ul>
          {/* <button><a href="/#">Choose Plane</a></button> */}
        </div>
        <div class="box">
          <h3>Price</h3>
          <img src="image/hosting-advanced.png" alt="" />
          <span class="amount">{service ? service.price: "0"}$</span>
          <ul>
            <li>Affordability</li>
            <li>Value for Money</li>
            <li>Cost-Effectiveness</li>
            <li>Reasonable Pricing</li>
            <li>Fair Pricing</li>
          </ul>
          <button><a href="/#">Contact Via E-mail</a></button>
        </div>
        <div class="box">
          <h3>Professional</h3>
          <img src="Image/hosting-professional.png" alt="" />
          <span class="amount">Quality</span>
          <ul>
            <li>Integrity</li>
            <li>Empathy</li>
            <li>Resilience</li>
            <li>Generosity</li>
            <li>Curiosity</li>
          </ul>
          {/* <button><a href="/#">Choose Plane</a></button> */}
        </div>
      </div>
    </div>
        </>
    )
}