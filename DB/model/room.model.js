import { Types,Schema,model } from "mongoose";

const roomSchema = new Schema ({
    RoomType:{
        type:String,
        required:true
    },
    Policy:{
        type:String,
        required:true
    },
    Amenties:{
    type:[String],
    required:true
    },
    Img:{
        type:[String],
        required:true
    },

    Payment:{
        type:String,
        required:true,
    },
    Price:{
        type:Number,
        required:true,
    },
    NumberOfBed:{
        type:Number,
        required:true
    },
    Availablility:{
        type:Boolean,
        default:true,
        required:false
    },
    Capacity:{
        type:Number,
        required:true
        
    },
    TypeOfBed:{
        type:String,
        required:true
    },
    HotelId:{
        type:Types.ObjectId,
        ref:"Hotel",
        required:true
    }

},{
    timestamps:true
})
const roomModel = model('room',roomSchema)
export default roomModel
