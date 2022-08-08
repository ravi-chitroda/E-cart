import AllProducts, { product } from "../product-Components/AllProducts";
import { useState, useEffect } from "react";
import { productType } from "../Types/Product";
// import {
//   collection,
//   query,
//   onSnapshot,
//   getDocs,
//   QuerySnapshot,
// } from "firebase/firestore";
// import { db } from "../firebaseConfig";

type productObj = {
  product: productType;
  // slice: any;
};
console.log("product @ index", product);

console.log("console", AllProducts);

const service = {
  getData: (props: productObj, { from, to }: any) => {
    return new Promise((resolve, reject) => {
      const data = product.slice(from, to);
      resolve({
        count: product.length,
        data: data,
      });
    });
  },
};

export default service;
