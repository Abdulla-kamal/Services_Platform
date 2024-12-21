import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import "./About.scss";
import Header from "../../Components/Header/Header";

export default function About() {
  return (
    <>
      <Header />
      <div class="how" id="how">
        <h2 class="main-title">Abou us</h2>
        <div class="container">
          <div class="image">
            <img src="./media/how.png" alt="" />
          </div>
          <div class="steps-work">
            <div class="box">
              <img src="./media/work-steps-1.png" alt="" />
              <div class="text">
                <h3>Business Analysis</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas nulla repudiandae facilis impedit eaque quibusdam
                  dolorem quasi!
                </p>
              </div>
            </div>
            <div class="box">
              <img src="./media/work-steps-2.png" alt="" />
              <div class="text">
                <h3>Business Analysis</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas nulla repudiandae facilis impedit eaque quibusdam
                  dolorem quasi!
                </p>
              </div>
            </div>
            <div class="box">
              <img src="./media/work-steps-3.png" alt="" />
              <div class="text">
                <h3>Business Analysis</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas nulla repudiandae facilis impedit eaque quibusdam
                  dolorem quasi!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
