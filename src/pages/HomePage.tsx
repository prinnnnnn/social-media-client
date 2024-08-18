import { Box } from '@mui/material'
import NavBar from './NavBar'
import UserWidget from '../components/UserWidget';
import MyPostWidget from '../components/MyPostWidget';
import { useMobileScreen } from '../components/hooks';
import PostsWidget from '../components/PostsWidget';
import AdvertWidget from '../components/AdvertWidget';
import FriendListWidget from '../components/FriendListWidget';

const HomePage = () => {

    const isNonMobileScreen = useMobileScreen(1000);

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 3%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
                mt="80px"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "25%" : undefined}>
                    <UserWidget />
                </Box>

                <Box 
                    flexBasis={isNonMobileScreen ? "41%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}    
                >
                    <MyPostWidget />
                    <PostsWidget />
                </Box>

                {isNonMobileScreen && (
                    <Box flexBasis="25%">
                        <AdvertWidget />
                        <Box m="2rem 0" />
                        <FriendListWidget />
                    </Box>
                )}

            </Box>
        </Box>
    )
}

export default HomePage