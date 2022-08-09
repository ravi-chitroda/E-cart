import {
  Box,
  Button,
  Checkbox,
  FormControl,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { productType } from "../Types/Product";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { db, auth } from "../firebaseConfig";
import { AddLocation, LocationOn, Print, Share } from "@mui/icons-material";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate, useNavigate } from "react-router-dom";

type productObj = {
  product: productType;
};

const ProductDetail = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<any>();
  const {
    id,
    title,
    brand,

    // description,
    // warranty,
    // price,
    // customerSupport,
    // productImage,
  } = useParams();

  console.log("id", id);
  const [location, setLocation] = useState<string>("");
  const [product, setProduct] = useState<any>("");
  const [successMsg, setSuccessMsg] = useState<String>("");
  const [errorMsg, setErrorMsg] = useState<String>("");
  const [user, setUser] = useState<any>("");

  const navigate = useNavigate();

  // console.log("productDetailPage", props);

  let overallTax = 10 / 100;
  let ourCommision = 10 / 100;
  let extraFundForFun = 10 / 100;

  let mrp = parseInt(product.price);
  console.log("mrp", mrp);
  let MRP2 =
    mrp + overallTax * mrp + ourCommision * mrp + extraFundForFun * mrp;
  // console.log("mrp2", MRP2);
  let newMrp = Math.round(MRP2);
  // console.log("newMRP", newMrp);
  const salePrice = Math.round(newMrp - mrp);
  // console.log("salePrice", salePrice);

  // if user not logged in and add item to cart
  // function GetCurrentUser() {
  //   const userCollectionRef = collection(db, "users");

  useEffect(() => {
    auth.onAuthStateChanged((userLogged) => {
      if (userLogged) {
        console.log("user Mail", userLogged.email);
        const getUsers = async () => {
          const q = query(
            collection(db, "users"),
            where("uid", "==", userLogged.uid)
          );
          console.log("q", q);
          const data = await getDocs(q);
          // setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          data.docs.forEach((doc, index) => {
            if (index === 0) {
              setUser({ ...doc.data(), id: doc.id });
            }
          });
        };
        getUsers();
      } else {
        setUser(null);
      }
    });
  }, []);
  //   return user;
  // }

  // const loggedUser = GetCurrentUser();
  // console.log("logged User detail", loggedUser);

  // To fetch product from firbase
  function GetCurrentProduct() {
    // const path = "products";
    // debugger;
    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(collection(db, `products`), id);
        // const docRef = doc(db, `products`, "productTitle");
        console.log("docref", docRef);
        const docSnap = await getDoc(docRef);
        console.log("docSnap", docSnap);
        setProduct(docSnap.data());
      };
      getProduct();
    }, []);
    return product;
    // console.log("pro", product);
  }
  GetCurrentProduct();
  console.log("product", product);

  const handleBuyButton = () => {
    navigate("/paymentPage");
  };

  const handleCartButton = () => {
    if (user) {
      addDoc(collection(db, `cart-${user.uid}`), {
        product,
        quantity: 1,
      }).then(() => {
        setSuccessMsg("Product added to cart");
        setTimeout(() => {
          // navigate("/cart");
        }, 2000);
      });
    } else {
      setErrorMsg("You Need to Login First for shopping");
    }
  };

  return (
    <Box>
      <Navbar />
      <Box>
        <Box
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bolder",
            color: "#4A235A",
            fontSize: "35px",
            // textDecoration: "underline",
          }}
        >
          {product.productTitle}
        </Box>

        {product ? (
          <Box>
            <Box>
              <Box
                style={{
                  display: "flex",
                  alignItems: "self-start",
                  justifyContent: "space-around",
                }}
              >
                <Box
                  component="img"
                  sx={{
                    height: 500,
                    width: 500,
                    // maxHeight: { xs: 233, md: 167 },
                    maxHeight: { xs: 700, md: 650 },
                    maxWidth: { xs: 600, md: 580 },
                    marginleft: "-20px",
                    marginTop: "10px",
                  }}
                  src={product.productImage}
                />

                <Box style={{}} sx={{ marginRight: "140px" }}>
                  <Box style={{ fontWeight: "bold" }}>
                    {product.productType}
                    {"\u00a0\u00a0"}
                    {product.brand}
                    {"\u00a0\u00a0"}
                    {product.product}
                    {"\u00a0\u00a0"}
                    {product.description}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    {product.description}
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Checkbox />
                    <Typography>Compare with Other</Typography> {"\u00a0\u00a0"}
                    <Share />
                    {"\u00a0\u00a0"}
                    <Print />
                  </Box>
                  <Box
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                    }}
                  >
                    <Box>
                      <Grid container>
                        <Grid item xs={6}>
                          <h5>Offer for You :</h5>
                          <ul>
                            <li>
                              Buy RCP warranty and save up to 55%. Read T&C
                            </li>
                            <li>
                              Get Cashback upto Rs. 1,000 on Mobikwik Wallet.
                              Read T&C
                            </li>
                            <li>
                              Flat 1500 Cashback on IndusInd Bank Credit EMI
                              transactions.. Read T&C
                            </li>
                            <li>
                              Get Trends voucher worth upto Rs.2000* with this
                              product. Read T&C
                            </li>
                          </ul>
                        </Grid>
                      </Grid>
                    </Box>
                    <Box
                      style={{
                        display: "flex",
                        alignItems: "flex-start",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                      }}
                    >
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                        }}
                      >
                        <Typography>
                          Price : &#x20b9; {product.price}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          MRP : &#x20b9;
                          <Typography
                            style={{ textDecoration: "line-through" }}
                          >
                            {newMrp}
                          </Typography>
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>
                          You Save : &#x20b9; {salePrice}{" "}
                        </Typography>
                      </Box>
                      <Box>
                        <Typography>EMI Option Available</Typography>
                      </Box>
                      <Box>
                        <Typography>Free Shipping</Typography>
                      </Box>
                      <Box>
                        <FormControl>
                          <Controller
                            name="productTitle"
                            control={control}
                            render={(props: any) => (
                              <TextField
                                // variant="standard"
                                {...props}
                                value={location}
                                type="search"
                                variant="filled"
                                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                                style={{ width: "20vw" }}
                                label="Enter Pincode"
                                {...register("location", {
                                  required: "Product Title is Required",
                                  minLength: {
                                    value: 6,
                                    message:
                                      "Name field must contain 3 character",
                                  },
                                })}
                                onChange={(e: any) =>
                                  setLocation(e.target.value)
                                }
                              />
                            )}
                          />
                          {/* <LocationOn /> */}

                          {/* {errors.location && (
                            <Typography
                              style={{
                                display: "flex",
                                alignItems: "flex-start",
                                justifyContent: "flex-start",
                                flex: 1,
                                // width: { xs: "100%", md: "80%", sm: "60%" },
                                color: "red",
                                fontSize: "small",
                                fontStyle: "oblique",
                                width: "40vw",
                              }}
                            >
                              {errors.location.message}
                            </Typography>
                          )} */}
                        </FormControl>
                      </Box>
                      <Box
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                        }}
                        sx={{ my: "2vw" }}
                      >
                        <Button
                          style={{
                            width: "10vw",
                            backgroundColor: "#EC5530 ",
                            color: "white",
                            borderRadius: "10px",
                          }}
                          sx={{ marginRight: "2px" }}
                          onClick={handleCartButton}
                        >
                          ADD TO CART
                        </Button>
                        <Button
                          style={{
                            width: "10vw",
                            backgroundColor: "#FFA07A",
                            color: "white",
                            borderRadius: "10px",
                          }}
                          onClick={handleBuyButton}
                        >
                          BUY NOW
                        </Button>
                        {successMsg && <Box>{successMsg}</Box>}
                        {errorMsg && <Box>{errorMsg}</Box>}
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        ) : (
          <Box>Loading............</Box>
        )}
      </Box>
    </Box>
  );
};

export default ProductDetail;
