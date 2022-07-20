import { TextField } from '@material-ui/core'
import { Pattern, TextFields } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { fontFamily } from '@mui/system'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { error } from 'console'

type LoginFormProps = {
  name: string,
  email: string,
  password: string


}

const Login = () => {
  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<any>("")
  const [successMsg, setSuccessMsg] = useState<any>("")
  const [errorMsg, setErrorMsg] = useState<any>("")

  const auth = getAuth();
  const navigate = useNavigate()



  const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormProps>();
  const onSubmit = (data: any) => {
    console.log(data)
  }

  const handleLoginButton = (e: any) => {
    e.preventDefault()
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      console.log("userCredential", userCredential)
      setSuccessMsg("Logged in Suuceesfully!!!")

      setEmail("")
      setPassword("")
      setErrorMsg("")
      setTimeout(() => {
        setSuccessMsg("")
        navigate("/")
      }, 3000)
    }).catch((error) => {
      console.log("error", JSON.stringify(error))
      console.log("error.message", error.message)
      // if (error.message = "INVALID_PASSWORD") {
      //   setErrorMsg("Password is Incorrect, Please use actual Password")
      // }
      // if (error.message = "EMAIL_NOT_FOUND") {
      //   setErrorMsg("Email is not Found, Please Signup first to Login here")
      // }
      // if (error.message = "INVALID_EMAIL") {
      //   setErrorMsg("Please fill all required detail")
      // }
      if (error.code === "auth/") {
        setErrorMsg("The password you entered does not match to this user.");
      }
      else {
        setErrorMsg(error.message);
      }

    })
    // setErrorMsg("")
    // // console.log("login Error", error)
    // console.log("login Error", errorMsg)
  }

  return (
    <Typography className='LoginPage'>
      <Navbar />
      <Box component="span"
        sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: 'column'
        }}
      >

        <form onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            // width: "40vw",
          }}>
          <Typography className='LogindHeader'
          //   style={{
          //   display : "flex",
          //   justifyContent: "center",
          //   alignItems : "center",
          // }}
          >
            <h2
              style={{
                textDecoration: "underline",
                color: "blueviolet",
                fontFamily: "roboto",
              }}
            >Please Fill All Detail For Login</h2>
          </Typography>

          {successMsg && <Typography style={{ color: "green" }}>
            {successMsg}
          </Typography>}
          {errorMsg && <> <Typography style={{ color: "red", width: "100%" }}>
            {errorMsg}
          </Typography> </>}

          <Controller
            name="email"
            control={control}
            render={(props: any) => (
              <TextField
                style={{ width: "40vw" }}
                // sx={{margin: "2px"}} 
                value={email}
                {...props}
                label="email"
                {...register("email", {
                  required: "Please enter your Email",
                  pattern: {
                    value:
                      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                    message: "Please write your registered mail",
                  }
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
                width: "100%",
                color: "red",
                fontSize: "medium",
                fontStyle: "oblique",
              }}
            >{errors.email.message}</Typography>
          )}

          <Controller
            render={(props: any) => (
              <TextField
                style={{
                  margin: "2px",
                  // width: { xs: "100%", md: "80%", sm: "60%" },
                  width: "40vw"
                }}
                {...props}
                value={password}
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
            <Typography
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "flex-start",
                flex: 1,
                width: "100%",
                color: "red",
                fontSize: "medium",
                fontStyle: "oblique",
              }}
            >
              {errors.password.message}
            </Typography>
          )}

          <Button type="submit" aria-label='Submit'
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
            onClick={handleLoginButton}
          >Submit
          </Button>
        </form>

        <Typography
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "40vw"
          }}
        >
          Don't Have Account??? &nbsp;
          <Typography style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",

          }}>
            <Typography sx={{
              '&:hover': {
                color: "green",
              },
              // mx: "4px",
              marginRight: "6px"
            }}>
              <Link
                to={"/signup"}
                style={{
                  textDecoration: "none",
                  fontWeight: "bolder",
                  fontSize: "22px",

                }}

              >
                {"   "} Sign Up
              </Link>{" "}
            </Typography>
            Here
          </Typography>
        </Typography>
      </Box>
    </Typography>
  )
}

export default Login

