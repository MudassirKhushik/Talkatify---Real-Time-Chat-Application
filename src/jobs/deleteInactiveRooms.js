import cron from "node-cron"
import Room from "../models/Room.js";
import Message from "../models/Message.js";

export const startRoomCleanupJob = ()=>{
    cron.schedule("*/5 * * * *", async ()=>{
        
        try{
        
        const thirtyMinAgo = new Date(Date.now() - 30 * 60 * 1000);

        const inactiveRooms = await Room.find({
            lastActive : {$lt : thirtyMinAgo}
        });
        console.log("Incative rooms : ",inactiveRooms)
        
        if(inactiveRooms.length === 0){
            console.log("No inactive rooms found");
            return;
        }

        for(const room of inactiveRooms){
            await Message.deleteMany({
                roomCode : room.roomCode
            });
            
            await Room.deleteOne({
                _id : room._id
            });
            
            console.log(`Deleted Rooms : ${room.name} (${room.roomCode})`);
        }
        
    }catch(error){
        console.log("Room cleanup error : " , error.message);
        
    }
    });

};
