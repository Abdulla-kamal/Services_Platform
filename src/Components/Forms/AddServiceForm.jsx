import "./Form.css";
import { arrayUnion, doc, updateDoc } from "firebase/firestore";
import { auth, db, storage } from "../../Firebase/firebase";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
const addServiceToUser  = async (service, setRefresh) => {
  const user = auth.currentUser ;
  if (user) {
    const pictureURLs = []; // Array to hold the URLs of uploaded pictures

    // Loop through the pictures and upload each one
    for (let i = 0; i < service.pictures.length; i++) {
      const pictureRef = ref(storage, `servicePictures/${user.uid}/${service.pictures[i].name}`);
      await uploadBytes(pictureRef, service.pictures[i]); // Upload the file
      const pictureURL = await getDownloadURL(pictureRef); // Get the download URL
      pictureURLs.push(pictureURL); // Store the URL
    }

    const userRef = doc(db, "Users", user.uid);
    await updateDoc(userRef, {
      services: arrayUnion({
        ...service,
        pictures: pictureURLs, // Save the array of picture URLs
      }),
    });

    setRefresh(prev => !prev);
    setTimeout(() => setRefresh(false), 0);
    toast.success("Service added successfully", {
      position: "top-center",
    });
  }
};

export default function AddServiceForm() {
  const [newService, setNewService] = useState({
    name: "",
    description: "",
    pictures: [],
    price: "",
    projects_link: "",
  });
  const [refresh, setRefresh] = useState(false);
  const handleAddService = (e) => {
    e.preventDefault();
    addServiceToUser(newService, setRefresh);

    setNewService({
      // Clear the input after adding
      name: "",
      description: "",
      pictures: [], // Change to an array to hold multiple pictures
      price: "",
      projects_link: "",
    });
  };

  useEffect(() => {
    if (refresh) {
      window.location.reload();
    }
  }, [refresh]);
  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (type === "file") {
      // Store files in an array
      setNewService((prev) => ({
        ...prev,
        pictures: [...prev.pictures, files[0]], // Add the new file to the array
      }));
    } else {
      setNewService({ ...newService, [name]: value });
    }
  };

  return (
    <newService onSubmit={handleAddService}>
      <div className="discount">
        <div className="discount-explain">
          <img src="./media/discount.png" alt="" />
          <h2 className="sub-title">Service</h2>
          <p></p>
        </div>
        <div className="discount-request">
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
          <h2 className="sub-title">Add Your Service</h2>
          <form action="">
            <input
              name="name"
              type="text"
              placeholder="Name"
              value={newService.name}
              onChange={handleChange}
            />
            <input  type="file" onChange={handleChange} />
            <input  type="file" onChange={handleChange} />
            <input  type="file" onChange={handleChange} />
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
