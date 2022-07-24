import React from 'react'
import Navbar from './Navbar'
import { collection, doc, getDocs, query, where } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { auth, db } from '../firebaseConfig'
import { Box, Typography } from '@mui/material'
import { border } from '@mui/system'

const Profile = () => {
    const GetCurrentUser = () => {
        const [user, setUser] = useState<any>('')
        const userCollectionRef = collection(db, "users")

        useEffect(() => {
            auth.onAuthStateChanged(userLogged => {
                if (userLogged) {
                    const getUsers = async () => {
                        const q = query(collection(db, "users"), where("uid", "==", userLogged.uid))  //for match with firbase uid
                        // console.log(q)
                        const data = await getDocs(q) //checking all data of user if it exist and fetch data from database
                        // setUser(getDocs)
                        console.log("data", data)
                        setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))

                    }
                    getUsers()
                }
                else {
                    setUser(null)
                }
            })
        }, [])
        return user
    }
    const loggedUser = GetCurrentUser();
    if (loggedUser) {
        console.log("logged User", loggedUser)
    }


    return (
        <Box>
            <Navbar />
            {loggedUser ? <Box style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", backgroundColor: "yellow", border: "2px solid green" }} mx={20} my={10} >
                <h3>Your Account Details</h3>

                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Typography> Name : </Typography>
                    <Typography m={1}>{loggedUser[0].FirstName} {loggedUser[0].LastName}</Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography> Email : </Typography>
                    <Typography m={1}>{loggedUser[0].Email} </Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography>Mobile Number : </Typography>
                    <Typography m={1}>{loggedUser[0].MobileNumber} </Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography> BirthDate : </Typography>
                    <Typography m={1}>{loggedUser[0].Birthdate} </Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center", }}>
                    <Typography> Address : </Typography>
                    <Typography m={1} >{loggedUser[0].AddressLine1} {loggedUser[0].AddressLine1}</Typography>
                </Box>
                <Box style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Typography> PinCode : </Typography>
                    <Typography m={1}>{loggedUser[0].Pincode} </Typography>
                </Box>
            </Box> : <Box> You are not Logged In, Please Login or SignUp First</Box>}
        </Box>
    )
}

export default Profile
