import { Link, useNavigate } from "react-router-dom";
import "./Login.scss";
import Register from "../Register/Register";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../Firebase/firebase";
import { toast } from "react-toastify";
import { useUser } from "../../../Context/UserProvider";
import Cookies from "universal-cookie";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const { setUser } = useUser(); // Get setUser  from context
  const cookies = new Cookies();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = userCredential.user;

      // Store user data in context
      setUser(user);

      // Store token in cookies
      const token = await user.getIdToken(); // Get the token
      cookies.set("token", token, { path: "/" }); // Set the token in a cookie
      console.log("User Logged In successfully");
      navigate("/");
      toast.success("User Logged In successfully", {
        position: "top-center",
      });
    } catch (err) {
      console.log(err.message);
      toast.error(err.message, {
        position: "bottom-center",
      });
    }
  };
  return (
    <>
      <Link to="/">
        {" "}
        <button
          style={{
            backgroundColor: "white",
            cursor: "pointer",
            fontWeight: "500",
            fontSize: "24px",
            padding: "10px 20px",
            margin: "10px 0 0 10px",
            color: "#000",
            border: "2px solid #2196f3",
          }}
        >
          Home
        </button>
      </Link>
      <div className="login">
        <form onSubmit={handleLogin}>
          <h1>Sign in</h1>
          <label htmlFor="">Username</label>
          <input
            name="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />

          <label htmlFor="">Password</label>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={form.password}
            onChange={handleChange}
          />
          {/* <button disabled={loading} type='submit'>{ loading ? 'Loading' : 'Login' }</button> */}
          {/* <span>{error && error}</span> */}
          <button className="login">Sign in</button>
          <p>
            If you do not have an acount <Link to="/register">Sign up</Link>{" "}
            here
          </p>
        </form>
      </div>
    </>
  );
}
