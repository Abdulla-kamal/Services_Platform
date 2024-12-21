import { useEffect } from "react";
import "./Footer.scss";

const Footer = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="footer">
      <div className="container">
        <div className="bottom">
          <div className="left">
            <h2>Freelancing</h2>
            <span>© Freelancing Platform Ltd. {new Date().getFullYear()}</span>
          </div>
          <div className="right">
            <div className="social">
              <img src="./media/twitter.png" alt="" />
              <img src="./media/facebook.png" alt="" />
              <img src="./media/linkedin.png" alt="" />
              <img src="./media/pinterest.png" alt="" />
              <img src="./media/instagram.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
