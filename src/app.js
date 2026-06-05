import express from "express";
import dns from "dns";
dns.setDefaultResultOrder("ipv4first");
import mongoose, { set } from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { createServer } from 'http'
import { Server } from 'socket.io'

import roomRoutes from './routes/roomRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import Message from "./models/Message.js";
import path from "path";
import { setUncaughtExceptionCaptureCallback } from "process";
import Room from "./models/Room.js";
import { startRoomCleanupJon } from "./jobs/deleteInactiveRooms.js";
import redisClient from "./config/redis.js";
import "./services/roomExpiration.js";

dotenv.config();

const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static("public"))

const httpServer = createServer(app)
const io = new Server( httpServer, {
    cors : {
        origin : "*"
    }
})

app.set("io", io);

const totalRoomUsers = [];

io.on('connection', (socket) => {
    console.log("User Connected : " + socket.id);

    socket.on("join-room", (roomCode, username)=>{
        socket.join(roomCode)
        console.log(`User Joined the Room : ${roomCode}`);

        socket.roomCode = roomCode;
        if(!totalRoomUsers[roomCode]){
            totalRoomUsers[roomCode] = new Set()
        }

        totalRoomUsers[roomCode].add(socket.id);

        io.to(roomCode).emit("online-users", {
            count : totalRoomUsers[roomCode].size
        });

        socket.to(roomCode).emit("user-joined", {
            user : username
        });

        
    });

    socket.on("send-message", async (data)=>{
        try{            
            const { roomCode, sender, text } = data
            const newMessage = await Message.create({
                roomCode,
                sender,
                text
            });

            await Room.findOneAndUpdate(
                { roomCode },
                { lastActive : new Date() }
            );

            await redisClient.expire(
                `room:${roomCode}`,
                120
            )

            io.to(roomCode).emit("receive-message", newMessage)
            
        }catch(error){
            console.log(error.message);
            
        }
    })

    socket.on("typing", (data)=>{
        socket.to(data.roomCode).emit("show-typing", {
            user : data.user
        })
    })

    socket.on('disconnect', ()=>{
        const roomCode = socket.roomCode;
        if (roomCode && totalRoomUsers[roomCode]){
            totalRoomUsers[roomCode].delete(socket.id)

            io.to(roomCode).emit("online-users", {
                count : totalRoomUsers[roomCode].size
            })
        }

        if(totalRoomUsers[roomCode] && totalRoomUsers[roomCode].size === 0){
            delete totalRoomUsers[roomCode]
        }

        console.log("User disconnected : " + socket.id);

    })
})

mongoose.connect(process.env.MongoURI, {
    serverSelectionTimeoutMS : 5000
})
.then(()=> console.log("Mongo DB connected"))
.catch((err)=> console.log("Mongo Error : " + err))

startRoomCleanupJon();

app.use('/api/rooms', roomRoutes)
app.use('/api/messages', messageRoutes)
app.get('/room/:name/:roomCode', (req, res)=>{
    res.sendFile(path.join(process.cwd() + "/public/chat.html"))
})

const PORT = process.env.PORT || 5000

httpServer.listen(PORT, ()=> console.log(`Server Running at port ${PORT}`))