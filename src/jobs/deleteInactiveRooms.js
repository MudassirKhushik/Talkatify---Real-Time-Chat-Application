import cron from "node-cron"
import Room from "../models/Room.js";

export const startRoomCleanupJon = ()=>{
    cron.schedule("*/1 * * * *", async ()=>{
        
        const thirtyMinAgo = new Date(Date.now() - 1 * 60 * 1000);

        const result  = await Room.updateMany(
            { 
                lastActive : {$lt : thirtyMinAgo},
                isDeleted : false  
            },
            {
                isDeleted : true
            }
        );
        console.log( `Marked ${result.modifiedCount} rooms deleted`);
    });

};
