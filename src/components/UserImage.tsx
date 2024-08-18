import React from "react";
import { Box } from "@mui/material";
import { useAppSelector } from "../state/hooks";
import { backendIpAddress } from "../services/url";

interface UserImageProps {
    picturePath?: string,
    size?: string,
}

const UserImage: React.FC<UserImageProps> = ({ picturePath, size = "60px"}) => {

    const image = useAppSelector(state => state.user?.picturePath);
    if (!picturePath) picturePath = image;

    return (
        <Box width={size} height={size}>
            <img
                style={{ objectFit: "cover", borderRadius: "50%"}}
                width={size}
                height={size}
                alt="user"
                src={`${backendIpAddress}/assets/${picturePath}`}
            />
        </Box>
    )
};

export default UserImage;