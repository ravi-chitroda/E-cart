import React from "react";
import { useState, useEffect } from "react";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { productType } from "../Types/Product";
import { db } from "../firebaseConfig";
import { Box } from "@mui/system";

type productObj = {
  product: productType;
  // slice: any;
};

const Service = (props: productObj) => {
  const [products, setProducts] = useState<
    Array<productType> | undefined | any
  >(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  //   to Fetch products from Firebase
  useEffect(() => {
    setLoading(true);
    const getProducts = () => {
      const productsArray: Array<any> = [];
      const path = "products";
      console.log("path", path);

      getDocs(collection(db, path))
        .then((QuerySnapshot) => {
          QuerySnapshot.forEach((doc: any) => {
            productsArray.push({ ...doc.data() });
            // console.log(doc.id, " =>", doc.data());
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
  console.log("products at service.tsx", products);

  const serviceData = {
    getData: ({ from, to }: any) => {
      return new Promise((resolve, reject) => {
        const data = products.slice(from, to);
        resolve({
          count: products.length,
          data: data,
        });
      });
    },
  };
  console.log("serviceData", serviceData);
  return <Box></Box>;
};

export const serviceData = "serviceData";

export default Service;
