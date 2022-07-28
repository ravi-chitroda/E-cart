import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import AllProducts from "../product-Components/AllProducts";
import Navbar from "./Navbar";

type HomeProps = {};
const Home = () => {
  const GetCurrentUser = () => {
    const [user, setUser] = useState<any>("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userLogged.uid)
            ); //for match with firbase uid
            // console.log(q)
            const data = await getDocs(q); //checking all data of user if it exist and fetch data from database
            // setUser(getDocs)
            console.log("data", data);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };
  const loggedUser = GetCurrentUser();
  if (loggedUser) {
    console.log("logged User", loggedUser[0].Email);
  }

  return (
    <Box>
      <Navbar />
      <Typography>
        {loggedUser ? loggedUser[0].Email : "No Logged User"}
      </Typography>
      <AllProducts />
    </Box>
  );
};

export default Home;
