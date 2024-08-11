// SaveContext.js
import { createContext, useContext, useState } from 'react';

const SaveContext = createContext();

export const SaveProvider = ({ children }) => {
    const [saveImageCard, setSaveImageCard] = useState(null);

    return (
        <SaveContext.Provider value={{ saveImageCard, setSaveImageCard }}>
            {children}
        </SaveContext.Provider>
    );
};

export const useSaveContext = () => {
    return useContext(SaveContext);
};
