import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import io from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  useEffect(() => {
    if (authUser) {
      const newSocket = io("http://localhost:8000", {
        query: {
          userId: authUser._id,
        },
      });

      setSocket(newSocket);

      // Listen for the 'getOnlineUsers' event
      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      // Cleanup the socket connection when the component unmounts or authUser changes
      return () => {
        newSocket.off("getOnlineUsers");
        newSocket.close();
      };
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
