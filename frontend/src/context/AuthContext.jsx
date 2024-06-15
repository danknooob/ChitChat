import { createContext, useState, useContext } from "react";

// Create the context
export const AuthContext = createContext();

// Custom hook to use the AuthContext
export const useAuthContext = () => {
    return useContext(AuthContext);
}

// AuthContextProvider component
export const AuthContextProvider = ({ children }) => {
    const [authUser, setAuthUser] = useState(() => {
        const storedUser = localStorage.getItem("chat-user");
        return storedUser ? JSON.parse(storedUser) : null;
    });

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
}
