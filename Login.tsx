import { TextField } from '@material-ui/core'
import { Pattern, TextFields } from '@mui/icons-material'
import { Box, Button, Typography } from '@mui/material'
import { fontFamily } from '@mui/system'
import React from 'react'
import { useForm, Controller } from 'react-hook-form'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'

type LoginFormProps = {
  name: string,
  email: string,
  password: string


}

const Login = () => {
  const { register, handleSubmit, formState: { errors }, control } = useForm<LoginFormProps>();
  const onSubmit = (data: any) => {
    console.log(data)

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
          <Controller
            name="email"
            control={control}
            render={(props: any) => (
              <TextField
                style={{ width: "40vw" }}
                // sx={{margin: "2px"}} 
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
            render={(props) => (
              <TextField
                style={{
                  margin: "2px",
                  // width: { xs: "100%", md: "80%", sm: "60%" },
                  width: "40vw"
                }}
                {...props}
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
              width: "20%",
              backgroundColor: "darkorchid",
              fontFamily: "inherit",
              fontSize: "large",
              color: "snow",
              fontWeight: "bolder",
              margin: "3%",
              borderRadius: "50%"
            }}
          >Submit
          </Button>
        </form>

        <Typography
          style={{
            fontSize: "20px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          Don't Have Account??? &nbsp;
          <Typography>
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
            Here
          </Typography>
        </Typography>
      </Box>
    </Typography>
  )
}

export default Login

