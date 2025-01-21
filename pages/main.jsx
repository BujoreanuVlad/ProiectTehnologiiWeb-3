import '../index.css'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AppRoutes from "./_routes/route.jsx";
import React from 'react';

const MainApp = () => {
    return (
        <StrictMode>
            <AppRoutes />
        </StrictMode>
    );
};

createRoot(document.getElementById("root")).render(<MainApp />);
