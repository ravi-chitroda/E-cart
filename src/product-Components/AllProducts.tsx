import React from "react";
import Navbar from "../components/Navbar";
import ProductContainer from "./ProductContainer";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../firebaseConfig";
import { Box } from "@mui/system";
import { productType } from "../Types/Product";
import { Container, Grid, Pagination, Paper, Typography } from "@mui/material";
import AppPagination from "../components/pagination/Pagination";

// type itemProps = {
//     type: any
//     watch: any
//     mobile: any
//     headphone: any
//     laptop: any
//     shoe: any
// }

// const AllProducts = (props: itemProps) => {
const AllProducts = () => {
  //   console.log("props", props.type);
  const [products, setProducts] = useState<Array<productType> | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false);

  //   to Fetch products from Firebase
  useEffect(() => {
    setLoading(true);
    const getProducts = () => {
      const productsArray: Array<any> = [];
      const path = "products";
      // console.log("path", path);

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc: any) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            // console.log(" =>", doc);
          });
          setProducts(productsArray);
          setLoading(false);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);
  //   console.log("products", products);

  //   const service = {
  //     getData: () => {
  //       return new Promise((resolve, reject) => {
  //         resolve({
  //           count: AllProducts.length,
  //           data: AllProducts,
  //         });
  //       });
  //     },
  //   };
  //   console.log("service", service);

  return (
    <Container sx={{ my: "20px" }}>
      <Grid
        container
        spacing={2}
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        sx={{ my: "2px" }}
      >
        {products &&
          products.map((product) => {
            return <ProductContainer product={product} />;
          })}
      </Grid>
      {loading && (
        <Typography
          style={{ fontSize: "30px", color: "#30EF09", fontWeight: "bolder" }}
        >
          Loading.....
        </Typography>
      )}
      {!loading && (
        <AppPagination
        //  setProducts={(p: any) => setProducts(p)}
        />
      )}
    </Container>
  );
};

// export { service };

export const products = "product";
export default AllProducts;
