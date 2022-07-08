import { Button, FormControl, FormHelperText, FormLabel } from '@material-ui/core'
import { DatePicker } from '@material-ui/pickers'
import { Box, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { AnyRecord } from 'dns'
import React, { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'



type SignupPageProps = {
  name: string,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  mobileNumber: number,
  // genderSelection: any,
  // label: any
  label: string
  // Birthdate: React.ReactNode
  Birthdate: any
  AddressLine1: string,
  AddressLine2: string,
  pincode: number,
  contained: any,
  gender: any
  // errors: { gender: any }
  errors: { gender: { message: any } }
  country: any
  // map: any
  countries: any
  // SkipAny: Any
  state: any
  // gender: React.ReactNode
  // genderSelectionHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
  // onChange?: ((event: React.SyntheticEvent<Element, Event>, checked: boolean) => void)
  // Female: any,
  // Male: any,
  // Other: any,
  // Gender: any


}

const Signup = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<SignupPageProps>()
  const [gender, setGender] = useState("")
  const [countries, setCountries] = useState([])
  const [state, setState] = useState('')
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [mobileNumber, setMobileNumber] = useState("")
  const [email, setEmail] = useState("")



  const stateData = ["Gujarat", "Maharashtra", "Punjab", "Goa", "Rajasthan"]

  const handleStateChange = (event: SelectChangeEvent<string>, child: React.ReactNode) => {
    setState(event?.target.value)
  }
  console.log(state)

  useEffect(() => {
    const data = require("../CountryData.json")
    // console.log("country", data)
    setCountries(data)
  }, [])

  const handleCountrySelect = (e: any) => {
    console.log(e.target.value)
  }
  // const SkipAny: string[] = countries.SkipAny

  const onSubmit = (data: any) => {
    console.log("SignupData", data);
  };

  // const isRadioSelected = (value: string): boolean => true

  // const genderSelectionHandler = (event: React.ChangeEvent<HTMLInputElement>): void => {
  //   console.log(event.target.value)
  // }

  const genderSelectionHandler = () => {
    setGender(gender)
  }

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
          <Controller
            name="firstName"
            control={control}
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
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

          <Controller
            name="lastName"
            control={control}
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
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
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
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
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
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

          <FormControl error={Boolean(errors.gender)}>
            <FormLabel
              component="legend"
              style={{
                display: "inline-block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                // marginLeft: "-10px",
                width: "40vw",
              }}> Gender : </FormLabel>
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
                display: "inline-block",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,

                width: "40vw",
              }}> Date of Birth :
            </FormLabel>
            <Controller
              render={(props) => (
                <TextField
                  style={{ width: "40vw" }}
                  sx={{ margin: "2px" }}
                  {...props}
                  //   label="Birthdate"
                  type="date"
                  {...register("Birthdate", {
                    required: "Please select Birthdate",
                  })}
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
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
                label="Address Line 1"
                style={{ width: "40vw" }}
                {...register("AddressLine1", {
                  required: "Please Enter your Address Line 1",
                })}
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
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
                label="Address Line 2"
                style={{ width: "40vw" }}
                {...register("AddressLine2", {
                  required: "Please Enter your Address Line 2",
                })}
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
            render={(props) => (
              <TextField
                variant="standard"
                {...props}
                label="Pin Code"
                style={{ width: "40vw" }}
                {...register("pincode", {
                  required: "Please Select your pincode",
                  pattern: {
                    value: /^\d{6}$/,
                    message: "Please Enter 6 digit valid Pin Code of your area",
                  },
                })}
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
          <FormControl error={Boolean(errors.country)}>
            <Controller
              render={(props) => (
                <Select
                  style={{ width: "40vw" }}
                  sx={{ margin: "4px" }}
                  {...props}
                  type="country"
                  // select
                  label="Please Choose Country"
                  {...register("country", {
                    required: "Please choose your Country",
                  })}
                  onChange={handleCountrySelect}
                >
                  <FormLabel> Country</FormLabel>
                  {
                    countries.map((i: any) => {
                      return (
                        <MenuItem key={i.country}>{i.country}</MenuItem>
                      )
                    })
                  }
                </Select>
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
            )}
          </FormControl>

          <FormControl>

            <Controller
              name='state'
              control={control}
              render={(props) => (
                <Select
                  value={state}
                  style={{ width: "40vw" }}
                  type="state"
                  // input={<OutlinedInput id="select-multiple-chip" label="Please select state" />}
                  label="Please select state "
                  sx={{ margin: "2px" }}
                  {...props}
                  {...register("state", {
                    required: "Please choose your state",
                  })}
                  onChange={handleStateChange}
                >
                  <MenuItem disabled value="">
                    <em>Please Select State</em>
                  </MenuItem>
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
          </FormControl>

          <Button
            type="submit"
            style={{
              width: "25%",
              backgroundColor: "blueviolet",
              fontFamily: "inherit",
              fontSize: "large",
              fontWeight: "bolder",
              color: "snow",
              borderRadius: "50%",
              margin: "3%",
            }}
            variant="contained"
            color="primary"
          >Submit</Button>

          <Typography style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            Already Have an Account???
            <Typography>
              <Link to={"/login"} style={{ textDecoration: "none", fontWeight: "bolder", fontSize: "22px" }} >
                {"  "}  Login </Link> Here
            </Typography>
          </Typography>
        </form>
      </Box>
    </Typography>
  )
}

export default Signup
