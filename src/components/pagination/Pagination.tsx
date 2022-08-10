import { Box, Pagination, paginationClasses } from "@mui/material";
import React, { useEffect, useState } from "react";
// import service from "../../service/Index";
import { productType } from "../../Types/Product";
import {
  collection,
  query,
  onSnapshot,
  getDocs,
  QuerySnapshot,
} from "firebase/firestore";
import { db } from "../../firebaseConfig";
// import { products } from "../../product-Components/AllProducts";
// import service from "../../services/Index";
// import Service, { serviceData } from "../../service/Service";
// import {db} from ''

type productObj = {
  product: productType;
  from: any;
  to: any;
};
// type proObj = {
//   setProducts
// }

const pageSize = 3;

const AppPagination = () => {
  const [products, setProducts] = useState<any>([]);
  const [loading, setLoading] = useState<boolean>(false);

  console.log("products", products);

  const service = {
    getData: ({ from, to }: any) => {
      return new Promise((resolve) => {
        const data = products.slice(from, to);
        console.log("data of service", data);
        resolve({
          count: products.length,
          data: data,
        });
      });
    },
  };
  // console.log("service", service);

  //   to Fetch products from Firebase
  // useEffect(() => {
  //   setLoading(true);
  //   const getProducts = () => {
  //     const productsArray: Array<any> = [];
  //     const path = "products";
  //     // console.log("path", path);

  //     getDocs(collection(db, path))
  //       .then((QuerySnapshot) => {
  //         QuerySnapshot.forEach((doc: any) => {
  //           productsArray.push({ ...doc.data() });
  //           // console.log(doc.id, " =>", doc.data());
  //         });
  //         setProducts(productsArray);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         console.log(error.message);
  //       });
  //   };
  //   getProducts();
  // }, []);
  // // console.log("products", products);

  const [pagination, setPagination] = useState<any>({
    count: 0,
    from: 0,
    to: 0,
  });

  useEffect(() => {
    // serviceData
    //   .getData({ from: pagination.from }, { to: pagination.to })
    //   .then((response: { count: any }) => {
    //     console.log(response);
    //     setPagination({ ...pagination, count: response.count });
    //   });
    // service
    //   .getData({ from: pagination.from}, {to: pagination.to })
    //   .then((response: any) => {
    //     console.log(response);
    //     setPagination({ ...pagination, count: response.count });
    //   });
    service
      .getData({ from: pagination.from, to: pagination.to })
      .then((response: any) => {
        setPagination({ ...pagination, count: response.count });
        console.log("response of pagination", response);
        setProducts(response.data);
      });
  }, [pagination.from, pagination.to]);

  // {
  //   console.log("page", pagination);
  // }

  const handlePageChange = (_event: any, page: number) => {
    const from = (page - 1) * pageSize;
    console.log("from", from);
    const to = (page - 1) * pageSize + pageSize;
    console.log("to", to);

    setPagination({ ...pagination, from: from, to: to });
  };
  console.log("pagination", pagination);

  return (
    <Box
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      sx={{ margin: "20px 0px" }}
    >
      <Pagination
        count={Math.ceil(pagination.count / pageSize)}
        color="primary"
        variant={"outlined"}
        defaultPage={2}
        // onChange={(_event, value) => setPagination(value)}
        onChange={handlePageChange}
      />
    </Box>
  );
};

export default AppPagination;
// function from(from: any, to: any) {
//   throw new Error("Function not implemented.");
// }

// function to(from: (from: any, to: any) => void, to: any) {
//   throw new Error("Function not implemented.");
// }
