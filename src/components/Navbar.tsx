import React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import Badge from "@mui/material/Badge";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import Search from "@mui/icons-material/Search";
import { Home, Sell, ShoppingCart } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
// import ecart from "../Images/ecart.jpg"
// import logo3 from "../Images/logo3.png"
import {
  collection,
  doc,
  getDocs,
  query,
  QuerySnapshot,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { setSourceMapRange } from "typescript";
import { Button, ButtonBase } from "@mui/material";
import { borderRadius } from "@mui/system";

// import ECart from "../Images/ECart.png"
//  type navbarProps = {
//   Admin : String
//  }

const Navbar = () => {
  const navigate = useNavigate();
  // const [loggedUser, setLoggedUser] = useState<any>("")

  // TO find current user with GetCurrentUser Function with below function and set it into user variable
  const GetCurrentUser = () => {
    const [user, setUser] = useState<any>("");
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged((userLogged) => {
        if (userLogged) {
          const getUsers = async () => {
            const q = query(
              collection(db, "users"),
              where("uid", "==", userLogged.uid)
            ); //for match with firbase uid
            // console.log(q)
            const data = await getDocs(q); //checking all data of user if it exist and fetch data from database
            // setUser(getDocs)
            console.log("data", data);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
          };
          getUsers();
        } else {
          setUser(null);
        }
      });
    }, []);
    return user;
  };

  // document of that user stored in below loggedUser const
  const loggedUser = GetCurrentUser();
  // if (loggedUser) {
  //   // console.log("logged User", loggedUser)
  // }

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget as any);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/login");
  };
  const handleMenuCloseToProfile = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/profile");
  };
  const handleSignup = () => {
    navigate("/signup");
  };

  const handleCartButton = () => {
    setAnchorEl(null);
    navigate("/cart");
  };
  const handleLogOut = () => {
    auth.signOut().then(() => {
      navigate("/login");
    });
  };

  const handleNotificationButton = () => {
    setAnchorEl(null);
    navigate("/notification");
  };
  const handleSellIcon = () => {
    setAnchorEl(null);
    navigate("/sellProducts");
  };

  const handleHomeIcon = () => {
    setAnchorEl(null);
    navigate("/");
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMobileMoreAnchorEl(event.currentTarget as any);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {!loggedUser && (
        <Typography>
          <MenuItem onClick={handleMenuCloseToProfile}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          <MenuItem onClick={handleSignup}>Register</MenuItem>
        </Typography>
      )}
      {loggedUser && (
        <Typography>
          <MenuItem onClick={handleMenuCloseToProfile}>Profile</MenuItem>
          <MenuItem onClick={handleLogOut}>Logout</MenuItem>
        </Typography>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      {/* <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <p>Profile</p>
        </MenuItem> */}
    </Menu>
  );

  // all item to be stored in this cartData variable
  const [cartData, setCartData] = useState<any>([]);
  if (loggedUser) {
    const getCartData = async () => {
      const cartArray: { id: string }[] = [];
      const path = `cart-${loggedUser[0].uid}`;
      // console.log("cart Path", path);
      getDocs(collection(db, path)).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          // console.log(doc.id, "=>>>>", doc.data());
          cartArray.push({ ...doc.data(), id: doc.id });
        });
        setCartData(cartArray);
      });
      // .catch("got Some Error");
    };
    getCartData();
  }

  return (
    <Box>
      <div className="navbar">
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="open drawer"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>

              {/* Logo */}
              <Typography
                // variant="h6"
                noWrap
                component="div"
                sx={{ display: { xs: "none", sm: "block" } }}
                style={{ height: "80px" }}
              >
                {/* <img src={ecart} /> */}
                {/* <img src={logo3} /> */}

                {/* <img src={ECart} /> */}
              </Typography>

              {/* cart button */}

              <Box sx={{ flexGrow: 1 }} />
              <Box sx={{ display: { xs: "none", md: "flex" } }}>
                {loggedUser && (
                  <Box>
                    <IconButton
                      size="large"
                      // aria-label="show 4 new mails"
                      color="inherit"
                      onClick={handleCartButton}
                    >
                      {/* <Badge badgeContent={loggedUser[0].cart} color="error"> */}
                      <Badge badgeContent={cartData.length} color="error">
                        <ShoppingCart />
                      </Badge>
                    </IconButton>

                    {/* //Notification  */}
                    <IconButton
                      size="large"
                      aria-label="show 17 new notifications"
                      color="inherit"
                      onClick={handleNotificationButton}
                    >
                      <Badge badgeContent={1} color="error">
                        <NotificationsIcon />
                      </Badge>
                    </IconButton>
                  </Box>
                )}

                <IconButton
                  size="large"
                  color="inherit"
                  onClick={handleHomeIcon}
                >
                  <Home />
                </IconButton>

                {loggedUser && loggedUser[0].UserType == "Admin" ? (
                  <IconButton
                    size="large"
                    color="inherit"
                    onClick={handleSellIcon}
                  >
                    <Sell />
                  </IconButton>
                ) : (
                  <Typography></Typography>
                )}

                {/* Profile Button */}
                <IconButton
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </Box>
      </div>
      {/* <Box>
        <Link to="/product-type/mobile" style={{}}>
          <Button
            style={{
              color: "white",
              backgroundColor: "MediumOrchid",
              border: "2px solid Indigo",
              borderRadius: "3px",
              marginLeft: "2px",
              marginRight: "2px",
              textDecoration: "none",
            }}
          >
            Mobile
          </Button>
        </Link>
        <Link to="/product-type/laptop">
          <Button
            style={{
              color: "white",
              backgroundColor: "MediumOrchid",
              border: "2px solid Indigo",
              borderRadius: "3px",
              marginLeft: "2px",
              marginRight: "2px",
              textDecoration: "none",
            }}
          >
            Laptop
          </Button>
        </Link>
        <Link to="/product-type/watch">
          <Button
            style={{
              color: "white",
              backgroundColor: "MediumOrchid",
              border: "2px solid Indigo",
              borderRadius: "3px",
              marginLeft: "2px",
              marginRight: "2px",
              textDecoration: "none",
            }}
          >
            Watch
          </Button>
        </Link>
        <Link to="/product-type/headphone">
          <Button
            style={{
              color: "white",
              backgroundColor: "MediumOrchid",
              border: "2px solid Indigo",
              borderRadius: "3px",
              marginLeft: "2px",
              marginRight: "2px",
              textDecoration: "none",
            }}
          >
            Headphone
          </Button>
        </Link>
        <Link to="/product-type/shoe">
          <Button
            style={{
              color: "white",
              backgroundColor: "MediumOrchid",
              border: "2px solid Indigo",
              borderRadius: "3px",
              marginLeft: "2px",
              marginRight: "2px",
              textDecoration: "none",
            }}
          >
            Shoe
          </Button>
        </Link>
      </Box> */}
    </Box>
  );
};

export default Navbar;
