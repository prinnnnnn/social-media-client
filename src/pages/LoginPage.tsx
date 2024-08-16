import React from "react";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { AppTheme } from "../theme";
import Form from "../components/LoginForm";

const LoginPage = () => {
    const theme = useTheme<AppTheme>();
    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");

    return (
        <Box>
            <Box
                width="100%"
                bgcolor={theme.palette.background.alt}
                p="1rem 6%"
                textAlign="center"
            >
                <Typography
                    fontWeight="bold"
                    fontSize="clamp(1rem, 2rem, 2.25rem)"
                    color="primary"
                >
                    Sociopedia
                </Typography>
            </Box>
            <Box 
                width={isNonMobileScreen ? "50%" : "93%"}
                p="2rem"
                m="2rem auto"
                borderRadius="1.5rem"
                bgcolor={theme.palette.background.alt}
            >
                <Typography fontWeight={500} variant="h5" sx={{ mb: "1.5rem"}}>
                    Welcome to Sociopedia, the Social Media for Socialpaths
                </Typography>
                <Form />
            </Box>
        </Box>
    );
};

export default LoginPage;
