import { useState } from "react";
import {
    Box,
    Button,
    TextField,
    useMediaQuery,
    Typography,
    useTheme,
} from "@mui/material";

import { EditOutlined } from "@mui/icons-material";
import { Formik, FormikHelpers } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../state/hooks";
import { setLogin } from "../state";
import Dropzone from "react-dropzone";
import FlexBetween from "./FlexBetween";
import { AppTheme } from "../theme";
import axios from "axios";
import { UserFormProps } from "../common/types";
import { backendIpAddress } from "../services/url";

const registerSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
    location: yup.string().required("required"),
    occupation: yup.string().required("required"),
    picture: yup.string().required("required"),
});

const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("required"),
    password: yup.string().required("required"),
});

const initValuesRegister = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    location: "",
    occupation: "",
    picture: "",
};

const initValuesLogin = {
    email: "",
    password: "",
};

const LoginForm = () => {
    const [pageType, setPageType] = useState<"login" | "register">("login");
    const { palette } = useTheme<AppTheme>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const isNonMobile = useMediaQuery("(min-width: 600px)");
    const isLogin = pageType === "login";
    const isRegister = pageType === "register";

    const register = async (values: UserFormProps, onSubmitProps: FormikHelpers<UserFormProps>) => {
        
        const formData = new FormData();

        for (let value in values) {
            formData.append(value, values[value as keyof UserFormProps] as string | Blob);
        }

        if (!(values.picture instanceof File))
            return

        formData.append('picturePath', values.picture.name);

        const { data } = await axios.post(`${backendIpAddress}/auth/register`, formData);
        
        // console.log(`Finish Register, data: ${data}`);

        onSubmitProps.resetForm();

        if (data) {
            setPageType("login");
        }

    }

    const login = async (values: UserFormProps, onSubmitProps: FormikHelpers<UserFormProps>) => {

        const { email, password } = values;
        const { data } = await axios.post(`${backendIpAddress}/auth/login`,
                                         { email, password },
                                         { headers: { "Content-Type": "application/json" }});

        onSubmitProps.resetForm();

        const { user, token } = data;

        if (user && token) {
            dispatch(
                setLogin({ user, token })
            )
        }

        navigate("/home")

    }

    const handleFormSubmit = async (values: UserFormProps, onSubmitProps: FormikHelpers<UserFormProps>) => {

        if (isLogin) {
            await login(values, onSubmitProps);
        }

        if (isRegister) {
            await register(values, onSubmitProps);
        }
    };

    return (
        <Formik<UserFormProps>
            onSubmit={handleFormSubmit}
            initialValues={isRegister ? initValuesRegister : initValuesLogin}
            validationSchema={isRegister ? registerSchema : loginSchema}
        >
            {({
                values,
                errors,
                touched,
                handleBlur,
                handleChange,
                handleSubmit,
                setFieldValue,
                resetForm,
            }) => (
                <form onSubmit={handleSubmit}>
                    <Box
                        display="grid"
                        gap="30px"
                        gridTemplateColumns="repeat(2, minmax(0, 1fr))"
                        sx={{
                            "& > div": {
                                gridColumn: isNonMobile ? undefined : "span 2",
                            },
                        }}
                    >
                        {isRegister && (
                            <>
                                <TextField
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={
                                        Boolean(touched.firstName) &&
                                        Boolean(errors.firstName)
                                    }
                                    helperText={
                                        touched.firstName && errors.firstName
                                    }
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={
                                        Boolean(touched.lastName) &&
                                        Boolean(errors.lastName)
                                    }
                                    helperText={
                                        touched.lastName && errors.lastName
                                    }
                                    sx={{ gridColumn: "span 1" }}
                                />
                                <TextField
                                    label="Location"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.location}
                                    name="location"
                                    error={
                                        Boolean(touched.location) &&
                                        Boolean(errors.location)
                                    }
                                    helperText={
                                        touched.location && errors.location
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    label="Occupation"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.occupation}
                                    name="occupation"
                                    error={
                                        Boolean(touched.occupation) &&
                                        Boolean(errors.occupation)
                                    }
                                    helperText={
                                        touched.occupation && errors.occupation
                                    }
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <Box
                                    gridColumn="span 2"
                                    border={`1px solid ${palette.neutral.medium}`}
                                    borderRadius="5px"
                                    p="1rem"
                                >
                                    <Dropzone
                                        accept={{
                                            "image": [".jpg", ".jpeg", ".png"]
                                        }}
                                        multiple={false}
                                        onDrop={(acceptedFiles) =>
                                            setFieldValue(
                                                "picture",
                                                acceptedFiles[0]
                                            )
                                        }
                                    >
                                        {({ getRootProps, getInputProps }) => (
                                            <Box
                                                {...getRootProps()}
                                                border={`2px dashed ${palette.primary.main}`}
                                                p="1rem"
                                                sx={{
                                                    "&:hover": {
                                                        cursor: "pointer",
                                                    },
                                                }}
                                            >
                                                <input {...getInputProps()} />
                                                {!values.picture ? (
                                                    <p>Add Picture Here</p>
                                                ) : (
                                                    <FlexBetween>
                                                        <Typography>
                                                            {   
                                                                // @ts-ignore
                                                                values.picture.name
                                                            }
                                                        </Typography>
                                                        <EditOutlined />
                                                    </FlexBetween>
                                                )}
                                            </Box>
                                        )}
                                    </Dropzone>
                                </Box>
                            </>
                        )}

                        <TextField
                            label="Email"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.email}
                            name="email"
                            error={
                                Boolean(touched.email) &&
                                Boolean(errors.email)
                            }
                            helperText={touched.email && errors.email}
                            sx={{ gridColumn: "span 2" }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            onBlur={handleBlur}
                            onChange={handleChange}
                            value={values.password}
                            name="password"
                            error={
                                Boolean(touched.password) &&
                                Boolean(errors.password)
                            }
                            helperText={touched.password && errors.password}
                            sx={{ gridColumn: "span 2" }}
                        />
                    </Box>

                    {/* BUTTON */}
                    <Box>
                        <Button
                            fullWidth
                            type="submit"
                            sx={{
                                m: "2rem  0",
                                p: "1rem",
                                backgroundColor: palette.primary.main,
                                color: palette.background.alt,
                                "&:hover": { color: palette.primary.main },
                            }}
                        >
                            { isLogin ? "LOGIN  " : "REGISTER"}
                        </Button>
                        <Typography
                            onClick={() => {
                                setPageType(isLogin ? "register" : "login");
                                resetForm();
                            }}
                            sx={{
                                textDecoration: "underline",
                                color: palette.primary.main,
                                "&:hover": {
                                    cursor: "pointer",
                                    color: palette.primary.light,
                                }
                            }}
                        >
                            {isLogin ? "Don't have an account? Sign Up here."
                            : "Already have an account? Login here."}
                        </Typography>
                    </Box>

                </form>
            )}
        </Formik>
    );
};

export default LoginForm;