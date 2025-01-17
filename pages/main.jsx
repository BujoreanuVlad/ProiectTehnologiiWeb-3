import { StrictMode, useState, createContext } from "react";
import { createRoot } from "react-dom/client";
import React from "react";
import "../index.css";
import AppRoutes from "./_routes/route.jsx";
import AddEventGroupModal from "../components/AddEventGroup.jsx";
import AddEventModal from "../components/AddEvent.jsx";

// Context for modals
export const ModalContext = createContext();

const MainApp = () => {
    const [showGroupModal, setShowGroupModal] = useState(false);
    const [showEventModal, setShowEventModal] = useState(false);

    return (
        <StrictMode>
            <ModalContext.Provider value={{ setShowGroupModal, setShowEventModal }}>
                <AppRoutes />
                {/* Modals - Render at top-level */}
                {showGroupModal && <AddEventGroupModal
                    show={showGroupModal}
                    handleClose={() => setShowGroupModal(false)}
                    handleAddGroup={(group) => console.log("Group Added:", group)}
                />}
                {showEventModal && <AddEventModal
                    show={showEventModal}
                    handleClose={() => setShowEventModal(false)}
                    handleAddEvent={(event) => console.log("Event Added:", event)}
                    groups={[]} // Provide dynamic group data if available
                />}
            </ModalContext.Provider>
        </StrictMode>
    );
};

createRoot(document.getElementById("root")).render(<MainApp />);
