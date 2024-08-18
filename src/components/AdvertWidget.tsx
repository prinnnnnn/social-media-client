import { Typography, useTheme } from "@mui/material";
import FlexBetween from "./FlexBetween";
import WidgetWrapper from "./WidgetWrapper";
import { AppTheme } from "../theme";
import { backendIpAddress } from "../services/url";

const AdvertWidget = () => {
    const { palette } = useTheme<AppTheme>();

    const dark = palette.neutral.dark;
    const main = palette.neutral.main;
    const medium = palette.neutral.medium;

    return (
        <WidgetWrapper display="flex" flexDirection="column">
            <FlexBetween>
                <Typography color={dark} variant="h5" fontWeight={500}>
                    Sponsored
                </Typography>
                <Typography color={medium}>Create Ad</Typography>
                <img
                    width="100%"
                    height="auto"
                    alt="advert"
                    src={`${backendIpAddress}/assets/info4.jpg`}
                    style={{ borderRadius: "0.75rem", margin: "0.75rem 0" }}
                />
                <FlexBetween>
                    <Typography color={main}>Company</Typography>
                    <Typography color={main}>Company website</Typography>
                </FlexBetween>
                <Typography color={medium} m="0.5rem 0">
                    Over the course of the past 2.5 years, I took out ~$125,000
                    in personal loans and credit card balance transfer loans to
                    purchase 4.5 Bitcoin. I've paid ~$8,000 in interest so far
                    and currently have a ~$45,000 remaining balance.
                </Typography>
            </FlexBetween>
        </WidgetWrapper>
    );
};

export default AdvertWidget;
