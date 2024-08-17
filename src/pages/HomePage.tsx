import { Box, useMediaQuery } from '@mui/material'
import NavBar from './NavBar'
// import { useAppSelector } from '../state/hooks';
import UserWidget from '../components/UserWidget';

const HomePage = () => {

    const isNonMobileScreen = useMediaQuery("(min-width: 1000px)");
    // const { _id, picturePath } = useAppSelector(state => state.user)!;

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
                    
                </Box>

                {isNonMobileScreen && (
                    <Box flexBasis="26%"></Box>
                )}

            </Box>
        </Box>
    )
}

export default HomePage