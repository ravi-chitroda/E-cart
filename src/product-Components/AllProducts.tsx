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

  useEffect(() => {
    const getProducts = () => {
      const productsArray: Array<any> = [];
      const path = "products";
      console.log("path", path);

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc: any) => {
            productsArray.push({ ...doc.data(), id: doc.id });
            console.log(doc.id, " =>", doc.data());
          });
          setProducts(productsArray);
        })
        .catch((error) => {
          console.log(error.message);
        });
    };
    getProducts();
  }, []);
  console.log("products", products);

  return (
    <Box>
      {/* <Navbar /> */}
      <Box>
        {products &&
          products.map((product) => {
            {
              console.log("products", products);
            }
            return <ProductContainer product={product} />;
          })}
      </Box>
    </Box>
  );
};

export default AllProducts;
