import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "../index.css";
import AppRoutes from "./_routes/route.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppRoutes />
  </StrictMode>
);
