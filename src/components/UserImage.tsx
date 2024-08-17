import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../state/hooks";

interface UserImageProps {
    size?: string,
}

const UserImage: React.FC<UserImageProps> = ({ size = "60px"}) => {

    const image = useAppSelector(state => state.user?.picturePath);
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

export default UserImage;