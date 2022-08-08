import { Delete } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import { isTemplateMiddleOrTemplateTail } from "typescript";
import { product } from "../product-Components/AllProducts";
import { productType } from "../Types/Product";

type cartObj = {
  itemData: productType;
};

const CartCard = (props: cartObj) => {
  const [productQuantity, setProductQuantity] = useState<number>(1);

  console.log("cartdatdProps", props.itemData);

  let p = props.itemData.product;

  let overallTax = 10 / 100;
  let ourCommision = 10 / 100;
  let extraFundForFun = 10 / 100;

  let mrp = parseInt(p.price);
  console.log("mrp @ cart card", mrp);
  let MRP2 =
    mrp + overallTax * mrp + ourCommision * mrp + extraFundForFun * mrp;
  console.log("mrp2", MRP2);
  let newMrp = Math.round(MRP2);
  console.log("newMRP", newMrp);
  const salePrice = Math.round(newMrp - mrp);
  console.log("salePrice", salePrice);

  const increaseQuantity = () => {
    setProductQuantity(productQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (productQuantity >= 1) {
      setProductQuantity(productQuantity - 1);
    }
  };

  const handleDeleteCartItem = () => {
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
        {/* <Typography>Cart Card</Typography> */}
        {/* <Box>{props.itemData.productTitle}</Box> */}
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
        <Box>&#x20b9; {salePrice * productQuantity}</Box>
        <Box>
          <Delete sx={{ color: "red" }} onClick={handleDeleteCartItem} />
        </Box>
        {/* <Box>{props.itemData.product.productTitle}</Box> */}
      </Box>
    </Box>
  );
};

export default CartCard;
