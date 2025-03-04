import React, { createContext, useContext, useState } from "react";

// Créer le contexte
const FlashMessageContext = createContext();

// Fournisseur du contexte
export const FlashMessageProvider = ({ children }) => {
    const [message, setMessage] = useState(null);
    const [type, setType] = useState(null);

    const addFlashMessage = (messageText, messageType) => {
        setMessage(messageText);
        setType(messageType);

        // Fermer le message après un délai
        setTimeout(() => {
            setMessage(null);
            setType(null);
        }, 6000);  // Le message disparait après 5 secondes
    };

    return (
        <FlashMessageContext.Provider value={{ message, type, addFlashMessage }}>
            {children}
        </FlashMessageContext.Provider>
    );
};

// Hook personnalisé pour utiliser le contexte
export const useFlashMessage = () => {
    return useContext(FlashMessageContext);
};
