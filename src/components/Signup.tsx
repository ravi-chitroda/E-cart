import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@material-ui/core";
// import { DatePicker } from '@material-ui/pickers'
import {
  Box,
  FormControlLabel,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link, Navigate } from "react-router-dom";
import Navbar from "./Navbar";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebaseConfig";
import { collection, addDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { width } from "@mui/system";

type SignupPageProps = {
  name: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  mobileNumber: number;
  // genderSelection: any,
  // label: any
  label: string;
  // Birthdate: React.ReactNode
  Birthdate: any;
  AddressLine1: string;
  AddressLine2: string;
  pincode: number;
  contained: any;
  gender: any;
  // errors: { gender: any }
  errors: { gender: { message: any } };
  country: any;
  // map: any
  countries: any;
  // SkipAny: Any
  state: any;
  userType: any;
  // gender: React.ReactNode
  // genderSelectionHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  // onChange?: ((event: React.SyntheticEvent<Element, Event>, checked: boolean) => void)
  // Female: any,
  // Male: any,
  // Other: any,
  // Gender: any
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<SignupPageProps>();
  const [gender, setGender] = useState<any>();
  const [countries, setCountries] = useState<any>([]);
  const [state, setState] = useState<any>();
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [mobileNumber, setMobileNumber] = useState<any>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<any>("");
  const [birthdate, setBirthdate] = useState<any>();
  const [AddressLine1, setAddressLine1] = useState<string>("");
  const [AddressLine2, setAddressLine2] = useState<string>("");
  const [pincode, setPinCode] = useState<any>();
  const [successMsg, setSuccessMsg] = useState<any>("");
  const [errorMsg, setErrorMsg] = useState<any>("");
  const [userType, setUserType] = useState<string>("");

  const navigate = useNavigate();

  const stateData = ["Gujarat", "Maharashtra", "Punjab", "Goa", "Rajasthan"];

  // const handleStateChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
  //   setState(event?.target.value)
  // }
  // console.log(state)

  // useEffect(() => {
  //   const data = require("../CountryData.json")
  //   // console.log("country", data)
  //   setCountries(data)
  // }, [])

  // const handleCountrySelect = (e: any) => {
  //   console.log(e.target.value)
  // }

  // const handleCountrySelect = (event: SelectChangeEvent<any>) => {
  //   setCountries(event.target.value)
  // }

  const onSubmit = (form: any, e: any) => {
    e.preventDefault();
    console.log(firstName, email, password);

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log("user", userCredential);
        const user = userCredential.user; //user define
        const initialCartValue = 0; //initially each new user cart will be 0
        console.log(user);
        const userObj = {
          FirstName: firstName,
          Email: email,
          LastName: lastName,
          UserType: userType,
          MobileNumber: mobileNumber,
          Password: password,
          Birthdate: birthdate,
          AddressLine1: AddressLine1,
          AddressLine2: AddressLine2,
          Pincode: pincode,
          cart: initialCartValue,
          uid: user.uid,
        };
        console.log("user", userObj);

        // "users" is folder name in storage of firebase
        addDoc(collection(db, "users"), userObj)
          .then(() => {
            setSuccessMsg("New User added successfully!!!!!");
            setFirstName("");
            setMobileNumber("");
            setLastName("");
            setEmail("");
            setPinCode("");
            setPassword("");
            setAddressLine1("");
            setGender("");
            setAddressLine2("");
            setCountries("");
            setState("");
            setErrorMsg("");
            setUserType("");
            setTimeout(() => {
              setSuccessMsg("");
              navigate("/login");
            }, 3000);
          })
          .catch((error) => setErrorMsg(error.message));
      })
      .catch((error) => {
        console.log("error2", error);

        // setErrorMsg(error.message)
        // console.log("error2", error)
        // if (error.Status == "Status code:400") {
        // if (error.status == 400) {
        //   setErrorMsg("Email is already in used.")
        // }

        // if (error.message == 'Firebase: Error(auth/invalid-email).') {
        //   setErrorMsg("Please Fill All Required Email")
        // }
        if (error.message) {
          setErrorMsg(" Email is already in used.");
        }
      });
  };

  console.log("errorMsg", errorMsg);

  // const signUpRegister = async () => {
  //   try{
  //   const user = await createUserWithEmailAndPassword(auth, email, password)
  //   console.log(user)
  //   } catch(error){
  //     console.log(error.message)
  //   }
  // }

  // const genderSelectionHandler = () => {
  //   setGender(gender)
  // }

  return (
    <Typography className="SignupPage">
      <Navbar />
      <Box
        component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(1.0)" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // width: "40vw",
          }}
        >
          <h3>Signup here to get Biggest Discount</h3>
          {successMsg && (
            <Typography style={{ color: "green" }}>{successMsg}</Typography>
          )}
          {errorMsg && (
            <>
              {" "}
              <Typography style={{ color: "red", width: "100%" }}>
                {errorMsg}
              </Typography>{" "}
            </>
          )}

          <FormControl>
            <Controller
              name="firstName"
              control={control}
              render={(props: any) => (
                <TextField
                  variant="standard"
                  {...props}
                  value={firstName}
                  // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                  style={{ width: "40vw" }}
                  label="First Name"
                  {...register("firstName", {
                    required: "First Name is Required",
                    minLength: {
                      value: 3,
                      message: "Name field must contain 3 character",
                    },
                    maxLength: {
                      value: 12,
                      message: "name field not contain more than 12 character",
                    },
                  })}
                  onChange={(e: any) => setFirstName(e.target.value)}
                />
              )}
            />
            {errors.firstName && (
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
                {errors.firstName.message}
              </Typography>
            )}
            {/* {errors.firstName ? (
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
                {errors.firstName.message}
              </Typography>) : (setFirstName(""))
            } */}
          </FormControl>

          <Controller
            name="lastName"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={lastName}
                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                style={{ width: "40vw" }}
                label="Last Name"
                {...register("lastName", {
                  required: "Last Name is Required",
                  minLength: {
                    value: 3,
                    message: "Name field must contain 3 character",
                  },
                  maxLength: {
                    value: 12,
                    message: "name field not contain more than 12 character",
                  },
                })}
                onChange={(e: any) => setLastName(e.target.value)}
              />
            )}
          />
          {errors.lastName && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.lastName.message}
            </Typography>
          )}

          <Controller
            name="mobileNumber"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={mobileNumber}
                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                style={{ width: "40vw" }}
                label="Mobile Number"
                {...register("mobileNumber", {
                  required: "Please fill Your Mobile Number",
                  pattern: {
                    value: /^\d{10}$/,
                    message: "Please enter valid 10 digit mobile number",
                  },
                })}
                onChange={(e: any) => setMobileNumber(e.target.value)}
              />
            )}
          />
          {errors.mobileNumber && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.mobileNumber.message}
            </Typography>
          )}

          <Controller
            name="email"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={email}
                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                style={{ width: "40vw" }}
                label="E-Mail"
                {...register("email", {
                  required: "Please, Fill your E-Mail Address",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please, Enter valid Email Address",
                  },
                })}
                onChange={(e: any) => setEmail(e.target.value)}
              />
            )}
          />
          {errors.email && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.email.message}
            </Typography>
          )}

          <FormControl>
            <Controller
              render={(props: any) => (
                <TextField
                  sx={{
                    margin: "2px",
                    width: "40vw",
                  }}
                  {...props}
                  value={password}
                  variant="standard"
                  label="password"
                  {...register("password", {
                    required: "Password must be required",
                    pattern: {
                      value:
                        /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
                      message:
                        "Password with minimum 8 character Upper & Lower case with symbol",
                    },
                  })}
                  onChange={(e: any) => setPassword(e.target.value)}
                />
              )}
              name="password"
              control={control}
            />
            {errors.password && (
              <div
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flex: 1,
                  // width: { xs: "100%", md: "80%", sm: "60%" },
                  width: "40vw",
                  color: "red",
                  fontSize: "small",
                  fontStyle: "oblique",
                }}
              >
                {errors.password.message}
              </div>
            )}
          </FormControl>
          <FormControl error={Boolean(errors.gender)}>
            <FormLabel
              component="legend"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // marginLeft: "-10px",
                width: "40vw",
                marginBottom: "2px",
              }}
            >
              {" "}
              Gender :{" "}
            </FormLabel>
            <RadioGroup
              row
              aria-label="gender"
              name="gender"
              style={{
                display: "flex",
                justifyContent: "space-evenly",
                alignItems: "flex-start",
                flexDirection: "row",
              }}
            >
              <FormControlLabel
                value="female"
                control={
                  <Radio
                    {...register("gender", { required: "Choose your gender" })}
                  />
                }
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={
                  <Radio
                    {...register("gender", { required: "Choose your gender" })}
                  />
                }
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={
                  <Radio
                    {...register("gender", { required: "Choose your gender" })}
                  />
                }
                label="Other"
              />
            </RadioGroup>
            <FormHelperText
              style={{
                display: "block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                width: "100%",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.gender?.message}
            </FormHelperText>
          </FormControl>
          <FormControl>
            <FormLabel
              component="legend"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,

                width: "40vw",
              }}
            >
              {" "}
              Date of Birth :
            </FormLabel>
            <Controller
              render={(props: any) => (
                <TextField
                  style={{ width: "40vw" }}
                  sx={{ margin: "2px" }}
                  {...props}
                  value={birthdate}
                  //   label="Birthdate"
                  type="date"
                  {...register("Birthdate", {
                    required: "Please select Birthdate",
                  })}
                  onChange={(event: any) => setBirthdate(event.target.value)}
                />
              )}
              name="Birthdate"
              control={control}
              //   defaultValue=""
            />
            <FormHelperText
              style={{
                display: "block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                width: "100%",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.Birthdate?.message}
            </FormHelperText>
          </FormControl>
          <Controller
            name="AddressLine1"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={AddressLine1}
                label="Address Line 1"
                style={{ width: "40vw" }}
                {...register("AddressLine1", {
                  required: "Please Enter your Address Line 1",
                })}
                onChange={(e: any) => setAddressLine1(e.target.value)}
              />
            )}
          />
          {errors.AddressLine1 && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.AddressLine1.message}
            </Typography>
          )}

          <Controller
            name="AddressLine2"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={AddressLine2}
                label="Address Line 2"
                style={{ width: "40vw" }}
                {...register("AddressLine2", {
                  required: "Please Enter your Address Line 2",
                })}
                onChange={(e: any) => setAddressLine2(e.target.value)}
              />
            )}
          />
          {errors.AddressLine2 && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.AddressLine2.message}
            </Typography>
          )}
          <Controller
            name="pincode"
            control={control}
            render={(props: any) => (
              <TextField
                variant="standard"
                {...props}
                value={pincode}
                label="Pin Code"
                style={{ width: "40vw" }}
                {...register("pincode", {
                  required: "Please Select your pincode",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Please Enter 6 digit valid Pin Code of your area",
                  },
                })}
                onChange={(e: any) => setPinCode(e.target.value)}
              />
            )}
          />
          {errors.pincode && (
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // width: { xs: "100%", md: "80%", sm: "60%" },
                width: "40vw",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.pincode.message}
            </Typography>
          )}

          <FormControl>
            <Controller
              name="userType"
              control={control}
              render={(props: any) => (
                <Select
                  value={userType}
                  style={{ width: "40vw" }}
                  type="userType"
                  // input={<OutlinedInput id="select-multiple-chip" label="Please select state" />}
                  label="userType"
                  sx={{ margin: "2px" }}
                  {...props}
                  {...register("userType", {
                    required: "Please choose your userType",
                  })}
                  onChange={(e: any) => setUserType(e.target.value)}
                >
                  {/* <FormLabel>Select Who you are</FormLabel> */}
                  <MenuItem value="User">User</MenuItem>
                  <MenuItem value="Admin">Admin</MenuItem>
                </Select>
              )}
            />
            {errors.userType && (
              <FormHelperText
                style={{
                  display: "block",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  flex: 1,
                  width: "100%",
                  color: "red",
                  fontSize: "small",
                  fontStyle: "oblique",
                }}
              >
                {errors.userType.message}
              </FormHelperText>
            )}
          </FormControl>

          {/* <FormControl>
            <Controller
              name="country"
              control={control}
              render={(props) => (
                <Select
                  label={countries}
                  value={countries}
                  {...props}

                  {...register("country", {
                    required: "Please choose your Country",
                  })}
                  onChange={handleCountrySelect}

                >
                  {countries.map((item: any) => {
                    return <MenuItem key={item.country} >{item.country}</MenuItem>
                  })}


                </Select>
              )}
            />
            {errors.country && (
              <FormHelperText>{errors.country.message}</FormHelperText>
            )}

          </FormControl> */}

          {/* <Controller
            render={(props: any) => (
              <TextField
                style={{ width: "40vw" }}
                sx={{ margin: "5px" }}
                //   id="full-width-text-field"

                {...props}
                value={countries}
                type="country"
                select
                label="Please Choose country"
                {...register("country", {
                  required: "Please choose your country",
                })}
              // onChange={(event: any) => setCountries(event.target.value)}
              >
                <FormLabel>Select your Country</FormLabel>
                {
                  countries.map((item: any) => {
                    return (
                      <MenuItem key={item.country} value={item.country} >{item.country}</MenuItem>
                    )
                  })
                }
              </TextField>
            )}
            name="country"
            control={control}
          />
          {errors.country && (
            <FormHelperText
              style={{
                display: "block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                width: "100%",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}
            >
              {errors.country.message}
            </FormHelperText>
          )} */}
          {/* <FormControl>
            <Controller
              name='state'
              control={control}
              render={(props: any) => (
                <Select
                  value={state}
                  style={{ width: "40vw" }}
                  type="state"
                  // input={<OutlinedInput id="select-multiple-chip" label="Please select state" />}
                  label="Please select state"
                  sx={{ margin: "2px" }}
                  {...props}
                  {...register("state", {
                    required: "Please choose your state",
                  })}
                  onChange={handleStateChange}
                >
                  <FormLabel>Select your Country</FormLabel>

                  {
                    stateData.map((item) => {
                      return (
                        <MenuItem value={item}>{item}</MenuItem>
                      )
                    })
                  }
                </Select>
              )}
            />
            {errors.state && (
              <FormHelperText style={{
                display: "block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                width: "100%",
                color: "red",
                fontSize: "small",
                fontStyle: "oblique",
              }}>
                {errors.state.message}
              </FormHelperText>
            )}
          </FormControl> */}

          <Button
            type="submit"
            style={{
              width: "40vw",
              backgroundColor: "Green",
              fontFamily: "inherit",
              fontSize: "large",
              color: "yellow",
              fontWeight: "bolder",
              // color: "snow",
              borderRadius: "2%",
              margin: "3%",
            }}
            variant="contained"
            color="primary"
          >
            Submit
          </Button>

          <Typography
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            Already Have an Account???
            <Typography>
              <Link
                to={"/login"}
                style={{
                  textDecoration: "none",
                  fontWeight: "bolder",
                  fontSize: "22px",
                }}
              >
                {"  "} Login{" "}
              </Link>{" "}
              Here
            </Typography>
          </Typography>
        </form>
      </Box>
    </Typography>
  );
};

export default Signup;
