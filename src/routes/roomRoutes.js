import express from "express";
import Room from "../models/Room.js";
import redisClient from "../config/redis.js";

const router = express.Router();

router.post('/create',async (req, res)=>{
    try{
        const { name } = req.body;

        const randomCode = Math.random().toString(36).substring(2, 8)
        
        const newRoom = await Room.create({
            name,
            roomCode : randomCode
        })

        await redisClient.set(
            `room:${newRoom.roomCode}`,
            "active",
            {
                EX : 120
            }
        );

        const baseURL = process.env.baseURL || "http://localhost:5000"

        const io = req.app.get("io");
        io.emit("new-room-created", newRoom);

        res.status(201).json({
            success : true,
            room : newRoom,
            link : `/room/${newRoom.roomCode}`
        });

    }catch(error){
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
});

router.get('/', async (req, res)=>{
    try{
        const rooms = await Room.find({
            isDeleted : false
        });
        console.log("Rooms : ", rooms);
        

        res.json({
            success : true,
            rooms
        });

    }catch(error){
        console.log(error);
        
        res.status(500).json({
            success : false,
            message : error.message
        });
    }
});

router.get("/:roomCode", async (req, res)=>{
    try{
        const room = await Room.findOne({
            roomCode : req.params.roomCode,
            isDeleted : false
        });

        if(!room) return res.status(404).json({message : "Room Not found"})

        res.json(room);    

    }catch(error){
        res.status(500).json({message : error.message});
    }
});



export default router;