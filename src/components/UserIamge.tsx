import React from "react";
import { Box } from "@mui/material";

interface UserImageProps {
    image: string,
    size?: string,
}

const UserIamge: React.FC<UserImageProps> = ({ image, size = "60px"}) => {

    console.log(`Fetching image from http://localhost:3001/assets/${image}`);

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`http://localhost:3001/assets/${image}`}
            />
        </Box>
    )
};

export default UserIamge;