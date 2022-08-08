import React from "react";
import Navbar from "./Navbar";
import {
  collection,
  doc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { Box, Typography } from "@mui/material";
import CartCard from "./CartCard";
import { productType } from "../Types/Product";

const Cart = () => {
  const [cartData, setCartData] = useState<any>([]);

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
    const getCartData = async () => {
      const cartArray: { id: string }[] = [];
      const path = `cart-${loggedUser[0].uid}`;
      //   console.log("cart Path", path);
      getDocs(collection(db, path)).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          //   console.log(doc.id, "=>>>>", doc.data());
          cartArray.push({ ...doc.data(), id: doc.id });
        });
        setCartData(cartArray);
      });
      // .catch("got Some Error");
    };
    getCartData();
  }

  //   console.log("cartData", cartData);
  return (
    <div>
      <Navbar />
      {cartData ? (
        <Box>
          <Box>Your Cart Items</Box>
          <Box>
            {/* {cartData.map((item) => {
                console.log("item @ cart", item)
              <CartCard key={item.id} itemData={item} />;
            })} */}

            {/* {cartData.map((item: productType) => {
              <CartCard key={item.id} itemData={item} />;
            })} */}

            {cartData &&
              cartData.map((item: productType) => {
                return <CartCard itemData={item} />;
              })}
          </Box>
        </Box>
      ) : (
        <Typography>Your Cart is Empty</Typography>
      )}
    </div>
  );
};

export default Cart;
