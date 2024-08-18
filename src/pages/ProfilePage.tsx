import { useEffect, useState } from "react";
import { useMobileScreen } from "../components/hooks";
import { useAppSelector } from "../state/hooks";
import NavBar from "./NavBar";
import { useParams } from "react-router-dom";
import { User } from "../common/types";
import axios from "axios";
import { backendIpAddress } from "../services/url";
import { Box } from "@mui/material";
import UserWidget from "../components/UserWidget";
import FriendListWidget from "../components/FriendListWidget";
import MyPostWidget from "../components/MyPostWidget";
import PostsWidget from "../components/PostsWidget";

const ProfilePage = () => {
    const [user, setUser] = useState<User | null>(null);
    const { userId } = useParams();
    const token = useAppSelector((state) => state.token);
    const isNonMobileScreen = useMobileScreen(1000);

    const getUser = async () => {
        const { data } = await axios.get(
            `${backendIpAddress}/user/${userId}`,
            { headers: { Authorization: `Bearer ${token}` } }
        );

        setUser(data);
    };

    useEffect(() => {
        getUser();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    if (!user) {
        console.log(`User not found!`);
        return null;
    }

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 3%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="2rem"
                mt="80px"
                justifyContent="center"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserWidget
                        userId={userId}
                        picturePath={user.picturePath}
                    />
                    <Box m="2rem 0" />
                    <FriendListWidget userId={userId} />
                </Box>

                <Box
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}
                >
                    <MyPostWidget />
                    <Box m="2rem 0" />
                    <PostsWidget isProfile />
                </Box>
            </Box>
        </Box>
    );
};

export default ProfilePage;
