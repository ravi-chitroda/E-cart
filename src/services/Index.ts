import AllProducts, { products } from "../product-Components/AllProducts";
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

// type productObj = {
//   product: productType;
//   // slice: any;
// };
// console.log("product @ index", products);

// console.log("console", AllProducts);

const service = {
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

export default service;
