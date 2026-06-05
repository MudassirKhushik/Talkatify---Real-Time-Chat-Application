import redisClient from "../config/redis.js";
import Room from "../models/Room.js";

const subscriber = redisClient.duplicate()

await subscriber.connect();

await subscriber.subscribe(
    "__keyevent@0__:expired",

    async (key)=>{
        
        if(!key.startsWith("room:")){
            return;
        }

        const roomCode = key.replace("room:" , "")

        console.log(`Room Expired ${roomCode}`);
        
        await Room.findOneAndUpdate(
            { roomCode },
            { isDeleted : true }
        );
    }
);