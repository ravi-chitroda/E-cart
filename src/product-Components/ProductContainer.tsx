import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { productType } from "../Types/Product";

type productObj = {
  product: productType;
};

const ProductContainer = (props: productObj) => {
  console.log("productContainer", props);

  return (
    <Grid>
      <Typography>List of all Porducts :</Typography>
      <Box>
        {props.product.productTitle}
        <br></br>
        {props.product.brand}
      </Box>
    </Grid>
  );
};

export default ProductContainer;
