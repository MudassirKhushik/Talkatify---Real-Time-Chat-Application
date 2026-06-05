import mongoose, { mongo, Schema } from "mongoose";

const roomSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    roomCode : {
        type : String,
        required : true,
        unique : true
    },
    members : {
        type : Number,
        default : 0
    },
    lastActive : {
        type : Date,
        default : Date.now()
    },
    isDeleted : {
        type : Boolean,
        default : false
    }
}, {timestamps : true})

const Room = mongoose.model("Room", roomSchema)

export default Room;