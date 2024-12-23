import { Link } from "react-router-dom";
import Footer from "../../Components/Footer/Footer";
import "./About.scss";
import Header from "../../Components/Header/Header";

export default function About() {
  return (
    <>
      <Header />
      <div className="how" id="how">
        <h2 className="main-title">Abou us</h2>
        <div className="container">
          <div className="image">
            <img src="./media/how.png" alt="" />
          </div>
          <div className="steps-work">
            <div className="box">
              <img src="./media/work-steps-1.png" alt="" />
              <div className="text">
                <h3>Business Analysis</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas nulla repudiandae facilis impedit eaque quibusdam
                  dolorem quasi!
                </p>
              </div>
            </div>
            <div className="box">
              <img src="./media/work-steps-2.png" alt="" />
              <div className="text">
                <h3>Business Analysis</h3>
                <p>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptas nulla repudiandae facilis impedit eaque quibusdam
                  dolorem quasi!
                </p>
              </div>
            </div>
            <div className="box">
              <img src="./media/work-steps-3.png" alt="" />
              <div className="text">
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
