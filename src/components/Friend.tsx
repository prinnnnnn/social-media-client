import React from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";

/* Components */
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { setFriends } from "../state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";
import { AppTheme } from "../theme";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { backendIpAddress } from "../services/url";

interface FriendProps {
    friendId: string,
    name: string,
    subtitle: string,
    userPicturePath: string,
}

const Friend: React.FC<FriendProps> = ({ friendId, name, subtitle, userPicturePath }) => {

    const { palette } = useTheme<AppTheme>();
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const userId = useAppSelector(state => state.user?._id); 
    const token = useAppSelector(state => state.token);
    const friends = useAppSelector(state => state.user?.friends);

    const primaryLight = palette.primary.light;
    const primaryDark = palette.primary.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    const isFriend = friends!.includes(friendId);

    const patchFriend = async () => {
        const { data } = await axios.patch(`${backendIpAddress}/user/${userId}/${friendId}`, 
                                            { headers: { Authorization: `Bearer ${token}`}}
        )
        dispatch(setFriends({ friends: data }));
    }

    return (
        <FlexBetween>
            <FlexBetween gap="1rem">
                <UserImage picturePath={userPicturePath} size="55px" />
                <Box
                    onClick={() => {
                        {/* 4:43 */}
                        navigate(`profile/${friendId}`);
                        navigate(0);
                    }}
                >
                    <Typography
                        color={main}
                        variant="h5"
                        fontWeight={500}
                        sx={{
                            "&:hover": {
                                color: palette.primary.light,
                                cursor: "pointer",
                            }
                        }}
                    >
                        {name}
                    </Typography>
                    <Typography color={medium} fontSize="0.75rem">
                        {subtitle}
                    </Typography>
                </Box>
            </FlexBetween>
            <IconButton
                onClick={() => patchFriend()}
                sx={{ bgcolor: primaryLight, p: "0.6rem"}}
            >
                {isFriend ? (
                    <PersonRemoveOutlined sx={{ color: primaryDark }} />
                ) : (
                    <PersonAddOutlined sx={{ color: primaryDark }} />
                )}
            </IconButton>
        </FlexBetween>
    );
};

export default Friend;
