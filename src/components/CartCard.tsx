import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { isTemplateMiddleOrTemplateTail } from "typescript";
import { db } from "../firebaseConfig";
import { products } from "../product-Components/AllProducts";
import { productType } from "../Types/Product";

type cartObj = {
  itemData: productType;
  userid: any;
};

const CartCard = (props: cartObj) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);

  console.log("cartCardProps", props.itemData);

  let p = props.itemData.product;

  let overallTax = 10 / 100;
  let ourCommission = 10 / 100;
  let extraFundForFun = 10 / 100;

  let mrp = parseInt(p.price);
  // console.log("mrp @ cart card", mrp);
  let discountPrise =
    overallTax * mrp + ourCommission * mrp + extraFundForFun * mrp;
  let MRP2 =
    mrp + overallTax * mrp + ourCommission * mrp + extraFundForFun * mrp;
  console.log("mrp2", MRP2);
  let newMrp = Math.round(MRP2);
  // console.log("newMRP", newMrp);
  const salePrice = Math.round(newMrp - discountPrise) * productQuantity;
  console.log("salePrice", salePrice);

  const increaseQuantity = async () => {
    setProductQuantity(productQuantity + 1);

    const itemRef = doc(db, `cart-${props.userid}`, `${props.itemData.id}`);
    await updateDoc(itemRef, {
      quantity: productQuantity + 1,
    }).then(() => {
      console.log("Quantity is changed");
    });
  };

  const decreaseQuantity = async () => {
    if (productQuantity >= 1) {
      setProductQuantity(productQuantity - 1);

      const itemRef = doc(db, `cart-${props.userid}`, `${props.itemData.id}`);
      await updateDoc(itemRef, {
        quantity: productQuantity - 1,
      }).then(() => {
        console.log("Quantity is changed");
      });
    }
  };

  const handleDeleteCartItem = async () => {
    await deleteDoc(
      doc(db, `cart-${props.userid}`, `${props.itemData.id}`)
    ).then(() => {
      console.log("document Deleted");
    });

    setProductQuantity(0);
  };

  return (
    <Box>
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box>{p.productTitle}</Box>
        <Box
          component="img"
          src={p.productImage}
          style={{}}
          sx={{
            height: 70,
            width: 70,
            maxHeight: { xs: 100, md: 90 },
            maxWidth: { xs: 100, md: 90 },
          }}
        />
        <Box>{p.Image}</Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button onClick={increaseQuantity}>+</Button>
          <Typography>{productQuantity}</Typography>
          <Button onClick={decreaseQuantity}>-</Button>
        </Box>
        <Box>&#x20b9; {salePrice}</Box>
        <Box>
          <Delete sx={{ color: "red" }} onClick={handleDeleteCartItem} />
        </Box>
      </Box>
    </Box>
  );
};

export default CartCard;
