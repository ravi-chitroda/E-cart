import React from 'react'
import Navbar from './Navbar'
import { Button, FormControl, FormHelperText, FormLabel } from '@material-ui/core'
// import { DatePicker } from '@material-ui/pickers'
import { Box, FormControlLabel, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, SelectChangeEvent, Stack, TextField, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { Link, Navigate } from 'react-router-dom'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { storage, auth, db } from '../firebaseConfig'
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore'
import { useNavigate } from 'react-router-dom';
import { Label } from '@mui/icons-material'
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage'
import { url } from 'inspector'

type SellProductProps = {
    productTitle: string,
    productType: string,
    brand: string,
    description: string,
    warranty: string,
    productImage: string,
    price: string,
    customerSupport: string


}

const SellProducts = () => {
    const { register, handleSubmit, formState: { errors }, control } = useForm<SellProductProps>();
    const [imageError, setImageError] = useState<string>("")
    const [successMessage, setSuccessMessage] = useState<string>("")
    const [uploadError, setUploadError] = useState<string>("")
    const [productTitle, setProductTitle] = useState<string>("")
    const [productType, setProductType] = useState<string>("")
    const [description, setDescription] = useState<string>("")
    const [brand, setBrand] = useState<string>("")
    const [customerSupport, setCustomerSupport] = useState("")
    const [price, setPrice] = useState<any>("")
    const [warranty, setWarranty] = useState<string>("")
    const [productImage, setProductImage] = useState<any>("")


    const onSubmit = (form: any, e: any) => {
        e.preventDefault();
        const storageRef = ref(storage, `product-images${productType.toUpperCase()}/${Date.now()}`)  //this is for making path of Image File
        // console.log("Image Store Path", storageRef.fullPath)

        uploadBytes(storageRef, productImage)
            .then(() => {
                getDownloadURL(storageRef).then(url => {
                    addDoc(collection(db, `products-${productType.toUpperCase()}`), {
                        productTitle,
                        productType,
                        description,
                        brand,
                        customerSupport,
                        price,
                        warranty,
                        productImage: url
                    })

                })
            })

    }

    const types = ['image/jpg', 'image/jpef', 'image/png', 'image/gif', 'image/PNG']
    const handleProductImage = (e: any) => {
        e.preventDefault();
        let selectedFile = e.target.files[0];
        console.log("Selected Image File", selectedFile)

        if (selectedFile) {
            if (selectedFile && types.includes(selectedFile.type)) {
                setProductImage(selectedFile)
                setImageError("")
            }
            else {
                setProductImage(null)
                setImageError("Please Select valid Image FIle Format(.jpg, .jpeg, .png, .gif)")
            }
        }
        else {
            setImageError("Please Select Your File")
        }
    }

    return (
        <div>
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
                    {successMessage && <Typography style={{ color: "green" }}>
                        {successMessage}
                    </Typography>}
                    {uploadError && <> <Typography style={{ color: "red", width: "100%" }}>
                        {uploadError}
                    </Typography> </>}


                    <FormControl>
                        <Controller
                            name="productTitle"
                            control={control}
                            render={(props: any) => (
                                <TextField
                                    variant="standard"
                                    {...props}
                                    value={productTitle}
                                    // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                                    style={{ width: "40vw" }}
                                    label="Product Title"
                                    {...register("productTitle", {
                                        required: "Product Title is Required",
                                        minLength: {
                                            value: 3,
                                            message: "Name field must contain 3 character",
                                        },
                                    })}
                                    onChange={(e: any) => setProductTitle(e.target.value)}
                                />
                            )}
                        />
                        {errors.productTitle && (
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
                                {errors.productTitle.message}
                            </Typography>)
                        }
                    </FormControl>

                    <Controller
                        name="productType"
                        control={control}
                        render={(props: any) => (
                            <TextField
                                variant="standard"
                                {...props}
                                value={productType}
                                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                                style={{ width: "40vw" }}
                                label="Product Type"
                                {...register("productType", {
                                    required: "Product Type is Required",
                                    minLength: {
                                        value: 3,
                                        message: "Name field must contain 3 character",
                                    },
                                    maxLength: {
                                        value: 12,
                                        message: "name field not contain more than 12 character",
                                    },
                                })}
                                onChange={(e: any) => setProductType(e.target.value)}
                            />
                        )}
                    />
                    {errors.productType && (
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
                            {errors.productType.message}
                        </Typography>
                    )}

                    <Controller
                        name="brand"
                        control={control}
                        render={(props: any) => (
                            <TextField
                                variant="standard"
                                {...props}
                                value={brand}
                                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                                style={{ width: "40vw" }}
                                label="Brand Name"
                                {...register("brand", {
                                    required: "Please Mention Brand Name",
                                })}
                                onChange={(e: any) => setBrand(e.target.value)}
                            />
                        )}
                    />
                    {errors.brand && (
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
                            {errors.brand.message}
                        </Typography>
                    )}

                    <FormControl>
                        <Controller
                            render={(props: any) => (
                                <TextField
                                    sx={{
                                        margin: "2px",
                                        width: "40vw"
                                    }}
                                    {...props}
                                    value={warranty}
                                    variant="standard"
                                    label="warranty"
                                    {...register("warranty", {
                                        required: "Warranty must be Mentioned of each Product",
                                    })}
                                    onChange={(e: any) => setWarranty(e.target.value)}
                                />
                            )}
                            name="warranty"
                            control={control}
                        />
                        {errors.warranty && (
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
                                {errors.warranty.message}
                            </div>
                        )}
                    </FormControl>


                    <Controller
                        name="description"
                        control={control}
                        render={(props: any) => (
                            <TextField
                                variant="standard"
                                {...props}
                                value={description}
                                // style={{ width: { xs: "100%", md: "80%", sm: "100%" } }}
                                style={{ width: "40vw" }}
                                label="Product Description"
                                {...register("description", {
                                    required: "Mention Product Description in Brief",
                                })}
                                onChange={(e: any) => setDescription(e.target.value)}
                            />
                        )}
                    />
                    {errors.description && (
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
                            {errors.description.message}
                        </Typography>
                    )}

                    <Controller
                        name="price"
                        control={control}
                        render={(props: any) => (
                            <TextField
                                variant="standard"
                                {...props}
                                value={price}
                                label="Product Price"
                                style={{ width: "40vw" }}
                                {...register("price", {
                                    required: "Please Enter your Product Price",
                                })}
                                onChange={(e: any) => setPrice(e.target.value)}
                            />
                        )}
                    />
                    {errors.price && (
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
                            {errors.price.message}
                        </Typography>
                    )}
                    <Controller
                        name="customerSupport"
                        control={control}
                        render={(props: any) => (
                            <TextField
                                variant="standard"
                                {...props}
                                value={customerSupport}
                                label="Customer Support Email or Mobile"
                                style={{ width: "40vw" }}
                                {...register("customerSupport", {
                                    required: "Please Select your customerSupport",

                                })}
                                onChange={(e: any) => setCustomerSupport(e.target.value)}
                            />
                        )}
                    />
                    {errors.customerSupport && (
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
                            {errors.customerSupport.message}
                        </Typography>
                    )}

                    <FormControl>
                        <InputLabel style={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start", }} sx={{ marginTop: "2px", marginBottom: "-3px" }}>Product Image :</InputLabel>
                        <Controller
                            name="productImage"
                            control={control}
                            render={(props: any) => (
                                <TextField
                                    type="file"
                                    variant="standard"
                                    {...props}
                                    value={productImage}
                                    // label="Product Image"
                                    style={{ width: "40vw" }}
                                    {...register("productImage", {
                                        required: "Please Enter your Product Image",
                                    })}
                                    onChange={handleProductImage}
                                />
                            )}
                        />
                        {errors.productImage && (
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
                                {errors.productImage.message}
                            </Typography>
                        )}
                    </FormControl>



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
                    >Add Product</Button>


                    {/* <Typography style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        Already Have an Account???
                        <Typography>
                            <Link to={"/login"} style={{ textDecoration: "none", fontWeight: "bolder", fontSize: "22px" }} >
                                {"  "}  Login </Link> Here
                        </Typography>
                    </Typography> */}
                </form>
            </Box>
        </div>
    )
}

export default SellProducts
