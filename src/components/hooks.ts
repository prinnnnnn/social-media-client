import { useMediaQuery } from "@mui/material";

export const useMobileScreen = (width: number) => useMediaQuery(`(min-width: ${width}px)`);