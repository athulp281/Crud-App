import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Student } from "./component/Student";
import { Box } from "@mui/material";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div>
                <Box
                    sx={{
                        backgroundImage:
                            'url("https://t4.ftcdn.net/jpg/02/40/63/55/360_F_240635575_EJifwRAbKsVTDnA3QE0bCsWG5TLhUNEZ.jpg")',
                        backgroundSize: "cover", // or 'contain', or any other CSS background-size value
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "center center",
                        height: "100vh",
                    }}
                >
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Student />}></Route>
                        </Routes>
                    </BrowserRouter>
                </Box>
            </div>
        </>
    );
}

export default App;
