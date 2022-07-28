import React from "react";
import "./App.css";
import { Route, Routes, useParams } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import Profile from "./components/Profile";
import Cart from "./components/Cart";
import Notification from "./components/Notification";
import SellProducts from "./components/SellProducts";
import AllProducts from "./product-Components/AllProducts";
// import { watch } from 'fs';

function App() {
  const { type } = useParams();

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/sellProducts" element={<SellProducts />} />
        <Route path="/allProducts" element={<AllProducts />} />
        {/* <Route path='/product-type/mobile' element={<AllProducts type={"Mobile"} />} /> */}
        {/* <Route
          path="/product-type/watch"
          element={
            type === "watch" && (
              <AllProducts
              // type={""}
              // productTitle={""}
              // productType={""}
              // brand={""}
              // description={""}
              // warranty={""}
              // productImage={""}
              // price={""}
              // customerSupport={""}
              />
            )
          }
        />
        <Route
          path="/product-type/mobile"
          element={
            type === "mobile" && (
              <AllProducts
              // type={""}
              // productTitle={""}
              // productType={""}
              // brand={""}
              // description={""}
              // warranty={""}
              // productImage={""}
              // price={""}
              // customerSupport={""}
              />
            )
          }
        />
        <Route
          path="/product-type/laptop"
          element={
            type === "laptop" && (
              <AllProducts
              // type={""}
              // productTitle={""}
              // productType={""}
              // brand={""}
              // description={""}
              // warranty={""}
              // productImage={""}
              // price={""}
              // customerSupport={""}
              />
            )
          }
        />
        <Route
          path="/product-type/shoe"
          element={
            type === "shoe" && (
              <AllProducts
              // type={""}
              // productTitle={""}
              // productType={""}
              // brand={""}
              // description={""}
              // warranty={""}
              // productImage={""}
              // price={""}
              // customerSupport={""}
              />
            )
          }
        />
        <Route
          path="/product-type/headphone"
          element={
            type === "headphone" && (
              <AllProducts
              // type={""}
              // productTitle={productTitle}
              // productType={""}
              // brand={""}
              // description={""}
              // warranty={""}
              // productImage={""}
              // price={""}
              // customerSupport={""}
              />
            )
          }
        /> */}

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
