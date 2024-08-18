import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { AppTheme } from "../theme";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import axios from "axios";
import { backendIpAddress } from "../services/url";
import { setFriends } from "../state";
import WidgetWrapper from "./WidgetWrapper";
import Friend from "./Friend";
import { User } from "../common/types";

interface FriendListWidgetProps {
    userId?: string,
}

const FriendListWidget: React.FC<FriendListWidgetProps> = ({ userId }) => {

    
    const { palette } = useTheme<AppTheme>();
    const dispatch = useAppDispatch();
    const loggedInUserId = useAppSelector(state => state.user!._id);
    const token = useAppSelector(state => state.token);
    const friends = useAppSelector(state => state.user?.friends);

    if (!userId) {
        userId = loggedInUserId;
    }

    const getFriends = async () => {
        const { data } = await axios.get(`${backendIpAddress}/user/friends/${userId}`, 
                                        { headers: { Authorization: `Bearer ${token}`}});

        dispatch(setFriends({ friends: data }));

    }

    useEffect(() => {
        getFriends();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <WidgetWrapper>
            <Typography
                color={palette.neutral.dark}
                variant="h5"
                fontWeight={500}
                sx={{ mb: "1.5rem" }}
            >
                Friend List
            </Typography>
            <Box display="flex" flexDirection="column" gap="1.5rem">
                {/* @ts-ignore */}
                {friends?.map((friend: User) => (
                    <Friend 
                        key={friend._id}
                        friendId={friend._id}
                        name={`${friend.firstName} ${friend.lastName}`}
                        subtitle={friend.occupation}
                        userPicturePath={friend.picturePath}
                    />
                ))}
            </Box>
        </WidgetWrapper>
    );
};

export default FriendListWidget;
