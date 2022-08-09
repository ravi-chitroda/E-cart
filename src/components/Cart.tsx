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
import { Box, Button, Typography } from "@mui/material";
import CartCard from "./CartCard";
import { productType } from "../Types/Product";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const [cartData, setCartData] = useState<any>([]);
  const [user, setUser] = useState<any>("");

  const navigate = useNavigate();
  console.log("cart user", user);
  console.log("cart data", cartData);

  // const GetCurrentUser = () => {
  //   const userCollectionRef = collection(db, "users");

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        const getUsers = async () => {
          const q = query(
            collection(db, "users"),
            where("uid", "==", user.uid)
          ); //for match with firebase uid
          // console.log(q)
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

  useEffect(() => {
    if (!!user) {
      const getCartData = async () => {
        const cartArray: { id: string }[] = [];
        const path = `cart-${user?.uid}`;
        //   console.log("cart Path", path);
        await getDocs(collection(db, path)).then((QuerySnapshot) => {
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
  }, [user]);

  const handleProceedButton = () => {
    navigate("/paymentPage");
  };

  //   console.log("cartData", cartData);
  return (
    <div>
      <Navbar />
      {cartData ? (
        // .length != 0
        <Box>
          <Box>Your Cart Items</Box>
          <Box>
            {!!cartData &&
              cartData.map((item: productType) => {
                return <CartCard itemData={item} userid={user.uid} />;
              })}
          </Box>
          {/* <Box>
            <Typography>
              Total Amount : &#x20b9; {salePrice * productQuantity}{" "}
            </Typography>
          </Box> */}
          <Box>
            <Button onClick={handleProceedButton}>Proceed to Buy</Button>
          </Box>
        </Box>
      ) : (
        <Typography>Your Cart is Empty</Typography>
      )}
    </div>
  );
};

export default Cart;
