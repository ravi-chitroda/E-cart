import {
  Box,
  Button,
  Card,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { Container } from "@mui/system";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { productType } from "../Types/Product";

type productObj = {
  product: productType;
};

const ProductContainer = (props: productObj) => {
  console.log("productContainer", props);

  const navigate = useNavigate();

  const handleCartButton = () => {
    navigate("/cart");
  };

  const handleBuyNowButton = () => {
    navigate("/paymentPage");
  };

  const handleProductDetail = () => {
    navigate("/productDetail");
  };

  return (
    <Card
      sx={{ height: 360, width: 360, mx: "10px", my: "10px" }}
      style={{ border: "2px solid #C0C0C0", borderRadius: "10px" }}
    >
      <Box
        component="img"
        sx={{
          height: 250,
          width: 320,
          // maxHeight: { xs: 233, md: 167 },
          maxHeight: { xs: 350, md: 280 },
          maxWidth: { xs: 350, md: 320 },
        }}
        onClick={handleProductDetail}
        style={{ border: "1px", borderRadius: "4px", cursor: "pointer" }}
        alt="Porduct Image"
        src={props.product.productImage}
      />
      <Box
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          fontWeight: "bold",
          color: "#4A235A",
        }}
        sx={{ mx: "25px" }}
      >
        <Box>{props.product.productTitle}</Box>
        <Box> {props.product.brand}</Box>
      </Box>
      {/* <Box style={{ fontSize: "13px", color: "#4A235A" }}>
        Feature : {props.product.description}
      </Box> */}
      <Box
        style={{
          color: "#F70720",
          fontWeight: "bold",
          fontSize: "18px",
        }}
      >
        {" "}
        only &#x20b9; {props.product.price}
      </Box>

      <Box
        style={{
          fontWeight: "bolder",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          color: "#F70720",
        }}
        sx={{ mx: "25px", marginTop: "4px", maxWidth: { xs: 350, md: 320 } }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#58D68D",
            color: "#F70720",
            fontWeight: "bold",
          }}
          onClick={handleCartButton}
        >
          ADD TO CART
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#58D68D",
            color: "#F70720",
            fontWeight: "bold",
            width: "130px",
          }}
          onClick={handleBuyNowButton}
        >
          BUY NOW
        </Button>
      </Box>
    </Card>
  );
};

export default ProductContainer;
