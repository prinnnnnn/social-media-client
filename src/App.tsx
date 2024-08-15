import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";

/* Pages import */
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/ProfilePage";
import NavBar from "./pages/NavBar";

function App() {

    const [mode, setMode] = useState<>();

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/profile/:userId" element={<ProfilePage />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
