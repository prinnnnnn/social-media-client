import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

/* Pages import */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./pages/NavBar";

/*  */
import { useMemo } from "react";
import { useAppSelector } from "./state/hooks";
import { createTheme } from "@mui/material/styles"
import { CssBaseline, ThemeProvider } from "@mui/material";
import { themeSettings } from "./theme";

function App() {

    const mode = useAppSelector((state) => state.mode);
    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

    return (
        <div className="App">
            <BrowserRouter>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <Routes>
                        <Route path="/" element={<LoginPage />} />
                        <Route path="/home" element={<HomePage />} />
                        <Route path="/profile/:userId" element={<ProfilePage />} />
                    </Routes>
                </ThemeProvider>
            </BrowserRouter>
        </div>
    );
}

export default App;
