import { Link, Links } from "react-router-dom";
import About from "../About/About";
import "./Home.css";
import Footer from "../../Components/Footer/Footer";
import Header from "../../Components/Header/Header";
export default function Homme() {
  return (
    <>
      <Header />
      <div class="landing">
        <div class="container">
          <div class="content">
            <h1>Freelancing Platform</h1>
            <p>
              Here you will find a collection of services if you are a customer,
              and you will serve your services if you are a seller.
            </p>
          </div>
          <div class="image">
            <img src="./media/image.png" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
