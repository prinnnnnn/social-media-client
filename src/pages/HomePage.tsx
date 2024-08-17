import { Box } from '@mui/material'
import NavBar from './NavBar'
import UserWidget from '../components/UserWidget';
import MyPostWidget from '../components/MyPostWidget';
import { useMobileScreen } from '../components/hooks';

const HomePage = () => {

    const isNonMobileScreen = useMobileScreen(1000);

    return (
        <Box>
            <NavBar />
            <Box
                width="100%"
                padding="2rem 6%"
                display={isNonMobileScreen ? "flex" : "block"}
                gap="0.5rem"
                justifyContent="space-between"
            >
                <Box flexBasis={isNonMobileScreen ? "26%" : undefined}>
                    <UserWidget />
                </Box>

                <Box 
                    flexBasis={isNonMobileScreen ? "42%" : undefined}
                    mt={isNonMobileScreen ? undefined : "2rem"}    
                >
                    <MyPostWidget />
                </Box>

                {isNonMobileScreen && (
                    <Box flexBasis="26%"></Box>
                )}

            </Box>
        </Box>
    )
}

export default HomePage