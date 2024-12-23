import Header from "../Header/Header";
import {  useParams } from "react-router-dom";

export default function Details() {
  const {id} = useParams();

  console.log(id)

  // const { service } = location.state; // Access the passed service data
  // console.log(service& service)
    return(
        <>
        <Header/>
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
          <span class="amount">$25</span>
          <ul>
            <li>20GB HDD Space</li>
            <li>10 Email Adresses</li>
            <li>5 Subdomains</li>
            <li>8 Databases</li>
            <li>Advanced Support</li>
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