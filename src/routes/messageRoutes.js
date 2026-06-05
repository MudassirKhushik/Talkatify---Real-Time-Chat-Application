import express from "express";
import Message from "../models/Message.js";

const router = express.Router()

router.get('/:roomCode', async(req, res)=>{
    try{
        const messages = await Message.find({ roomCode : req.params.roomCode }).sort({ createdAt : 1});

        res.json(messages);
    }catch(error){
        res.status(500).json({
            message : error.message
        });
    }
});

export default router;