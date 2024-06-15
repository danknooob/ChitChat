import { Server } from 'socket.io';
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["http://localhost:5173"],
        methods: ["GET", "POST"],
    },
});

const userSocketMap = {}; // {userId: socketId}

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    const userId = socket.handshake.query.userId;
    if (userId !== "undefined") {
        userSocketMap[userId] = socket.id;
        console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    } else {
        console.log("User ID is undefined in the handshake query");
    }

    // Emit the current list of online users to all clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    console.log("Emitted online users:", Object.keys(userSocketMap));

    // Handle disconnection
    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
        if (userId && userSocketMap[userId]) {
            delete userSocketMap[userId];
            console.log(`Removed user ${userId} from userSocketMap`);
        }
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
        console.log("Emitted updated online users after disconnection:", Object.keys(userSocketMap));
    });
});


export { app, io, server };