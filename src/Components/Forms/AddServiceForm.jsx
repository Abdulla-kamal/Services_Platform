import "./Form.css";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
const addServiceToUser = async (service) => {
  const user = auth.currentUser;
  if (user) {
    const userRef = doc(db, "Users", user.uid);
    await updateDoc(userRef, {
      services: arrayUnion(service), // Use arrayUnion to add the item to the array
    });
    toast.success("Service added successfully", {
      position: "top-center",
    });
  }
};

export default function AddServiceForm() {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    picture_1: "",
    picture_2: "",
    picture_3: "",
    price: "",
    projects_link: "",
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    addServiceToUser(newService);

    setNewService({
      // Clear the input after adding
      name: "",
      description: "",
      picture_1: "",
      picture_2: "",
      picture_3: "",
      price: "",
      projects_link: "",
    });
  };

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    // Check if the input type is file
    if (type === "file") {
      // If it's a file input, set the first file in the files array
      setNewService({ ...newService, [name]: files[0].name });
    } else {
      // For other input types, just set the value
      setNewService({ ...newService, [name]: value });
    }
  };

  return (
    <newService onSubmit={handleAddItem}>
      <div class="discount" >
        <div class="discount-explain">
          <img src="./media/discount.png" alt="" />
          <h2 class="sub-title">Service</h2>
          <p></p>
        </div>
        <div class="discount-request">
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
                textAlign: "right",
              }}
            >
              Home
            </button>
          </Link>
          <h2 class="sub-title">Add Your Service</h2>
          <form action="">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={newService.name}
              onChange={handleChange}
            />
            <input name="picture_1" type="file" onChange={handleChange} />
            <input name="picture_2" type="file" onChange={handleChange} />
            <input name="picture_3" type="file" onChange={handleChange} />
            <input
              name="price"
              type="number"
              placeholder="price"
              value={newService.price}
              onChange={handleChange}
            />
            <input
              name="projects_link"
              type="text"
              value={newService.projects_link}
              placeholder="Your Previous Projects (URL)"
              onChange={handleChange}
            />
            <textarea
              name="description"
              id=""
              cols="30"
              rows="10"
              value={newService.description}
              onChange={handleChange}
              placeholder="Tell Us About Your Service"
            ></textarea>
            <input type="submit" value="Post" />
          </form>
        </div>
      </div>
    </newService>
  );
}
