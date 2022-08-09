import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import AllProducts from "../product-Components/AllProducts";
import Navbar from "./Navbar";

type HomeProps = {};
const Home = () => {
  const [user, setUser] = useState<any>({});

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getUsers = async () => {
          console.log("getUser", getUsers);
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          ); //for match with firebase uid
          console.log("Home Page query", q);
          const data = await getDocs(q); //checking all data of user if it exist and fetch data from database
          // setUser(getDocs)
          console.log("data", data);
          // setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          data.docs.forEach((doc, index) => {
            if (index === 0) {
              setUser({ ...doc.data(), id: doc.id });
            }
          });
        };
        getUsers();
      } else {
        setUser(null);
      }
    });
  }, []);

  console.log("user@Home", user);
  // if (user) {
  //   console.log("logged User", user[0].Email);
  // }

  return (
    <Box>
      <Navbar />
      <Typography>{user ? user.Email : "No Logged User"}</Typography>
      <AllProducts />
    </Box>
  );
};

export default Home;
