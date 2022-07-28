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

// type itemProps = {
//     type: any
//     watch: any
//     mobile: any
//     headphone: any
//     laptop: any
//     shoe: any
// }

type productProps = {
  type: any;
  productTitle: string;
  productType: string;
  brand: string;
  description: string;
  warranty: string;
  productImage: string;
  price: string;
  customerSupport: string;
};

// const AllProducts = (props: itemProps) => {
const AllProducts = () => {
  //   console.log("props", props.type);
  const [products, setProducts] = useState<any>([]);

  useEffect(() => {
    const getProducts = () => {
      const productsArray: { id: string }[] = [];
      const path = "products";
      console.log("path", path);

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc) => {
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
    <div>
      {/* <Navbar /> */}
      <Box>
        {products.map((product: any) => {
          <ProductContainer
            key={product.id}
            // product = {product}
          />;
        })}
      </Box>
    </div>
  );
};

export default AllProducts;
