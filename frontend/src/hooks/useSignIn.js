import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignIn = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const signIn = async(userName, password) => {
        const success = handleInputErrors(userName, password);
        if (!success) return;

        setLoading(true);
        try {
            const res = await fetch("/api/auth/signin", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ userName, password }), // Use userName here
            });

            const data = await res.json();
            if (data.error) {
                throw new Error(data.error);
            }

            localStorage.setItem("chat-user", JSON.stringify(data));
            setAuthUser(data);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signIn };
};
export default useSignIn;

function handleInputErrors(userName, password) {
    if (!userName || !password) {
        toast.error("Please fill in all fields");
        return false;
    }
    return true;
}