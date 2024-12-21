import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase/firebase';
import { doc, getDoc } from 'firebase/firestore';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser ] = useState(null);
useEffect(()=> {
  const unsubscribe = auth.onAuthStateChanged(async(user) => {
    if (user) {
      // User is logged in, fetch additional user data from Firestore
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        setUser (docSnap.data()); // Set user data from Firestore
      } else {
        console.log("No such document!");
        setUser (null); // Set user to null if no document exists
      }
    } else {
      // User is logged out
      setUser (null);
    }
  });
  return () => unsubscribe(); // Cleanup subscription on unmount
}, [])
  return (
    <UserContext.Provider value={{ user, setUser  }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser  = () => {
  return useContext(UserContext);
};