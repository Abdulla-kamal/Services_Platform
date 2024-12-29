
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss'
import { useState } from 'react';
import {createUserWithEmailAndPassword} from "firebase/auth";
import{auth, db, storage} from "../../../Firebase/firebase"
import {setDoc, doc} from "firebase/firestore"
import {toast} from "react-toastify"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';



export default function Register() {
const [form, setForm] = useState({
  email: "",
  password:"",
  name: "",
  picture:"",
  description:"",
  phone:"",
  linkedin:"",
  role:"Customer"
})
const navigate = useNavigate();
const handleChange= (e)=> {
  const { name, value, type, files } = e.target;
    // Check if the input type is file
    if (type === 'file') {
      // If it's a file input, set the first file in the files array
      setForm({ ...form, [name]: files[0] });
    } else {
      // For other input types, just set the value
      setForm({ ...form, [name]: value });
    }
}

const handleRegister = async(e)=> {
  e.preventDefault();
  try{
await createUserWithEmailAndPassword(auth, form.email, form.password); //Create User 
const user = auth.currentUser;


if(user) {
      // Upload the profile picture to Firebase Storage
      const pictureRef = ref(storage, `profilePictures/${user.uid}/${form.picture.name}`);
      await uploadBytes(pictureRef, form.picture); // Upload the file

      // Get the download URL of the uploaded picture
      const pictureURL = await getDownloadURL(pictureRef);

      

// Save user data in Firestore including the picture URL
  await setDoc(doc(db, "Users", user.uid), {
    email: user.email,
    name: form.name,
    description: form.description,
    phone: form.phone,
    linkedin: form.linkedin,
    picture: pictureURL,
    role: form.role,
    services: [], // Initialize an empty array
    favorites: [] // Initialize an empty array
  })
  navigate("/login");
  console.log("User Registered Successfully");
  toast.success("User Registered Successfully", {
    position:"top-center"
  })
}
  }catch(e){
console.log(e.message)
toast.error(e.message, {
  position:"bottom-center"
})
  }
}



    return(
      <>
       <Link to='/'> <button style={{backgroundColor:'white',color:'#000', cursor:'pointer', fontWeight:'500', fontSize:'24px',padding:'10px 20px', margin:'10px 0 0 10px',   border: '2px solid #2196f3'}}>Home</button></Link>
        <div className="register">
      <form onSubmit={handleRegister}>
        <div className="left">
          <h1>Create a new account</h1>
          <label htmlFor="">Username</label>
          <input
            name="name"
            type="text"
            placeholder="johndoe"
            value={form.name}
            onChange={handleChange}
          />
          <label htmlFor="">Email</label>
          <input
            name="email"
            type="email"
            placeholder="email"
            value={form.email}
            onChange={handleChange}
          />
          <label htmlFor="">Password</label>
          <input name="password" type="password" value = {form.password} onChange={handleChange}/>
          <label htmlFor="">Profile Picture</label>
          <input name='picture' type="file"   onChange={handleChange}/>
          {/* <button type="submit" disabled={loading}>{loading ? 'Loading...' : 'Register'}</button> */}
          
        </div>
        <div className="right">
          <p>Already have an account? <Link to='/login'>Sign in</Link></p>
          <h1>I want to become a seller</h1>
          <label htmlFor="userRole">Select Role:</label>
      <select id="userRole" name="role" value={form.role} onChange={handleChange}>
        <option value="Customer">Customer</option>
        <option value="Seller">Seller</option>
      </select>
          <label htmlFor="">Phone Number</label>
          <input
            name="phone"
            type="text"
            placeholder="+218.........."
            value = {form.phone}
            onChange={handleChange}
          />
          <label htmlFor="">Linkedin acount link</label>
          <input
            name="linkedin"
            type="text"
            placeholder="https:://www.linkedin..."
            value = {form.linkedin}
            onChange={handleChange}
          />
          <label htmlFor="">Description</label>
          <textarea
            placeholder="A short description of yourself"
            name="description"
            id=""
            cols="30"
            rows="10"
            value={form.description}
            onChange={handleChange}

          ></textarea>
        <button>Register</button>
        </div>
      </form>
    </div>
      </>
    );
}