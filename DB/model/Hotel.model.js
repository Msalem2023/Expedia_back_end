import { Types, Schema, model } from "mongoose";

const HotelSchema = new Schema({
    HotelName: {
        type: String,
        required: true
    },
    Policy: {
        type: String,
        required: true
    },
    Location: {
        type: String,
        required: true
    },
    Img: {
        type: String,
        required: true
    },

    Payment: {
        type: String,
        required: true,
    },
    Price: {
        type: String,
        required: true,
    },
    Total: {
        type: String,
        required: true
    },
    Availability: {
        type: String,
        required: false
    },
    Amenities: {
        type:String,
        required:true

    },
    Meal:{
        type:String,
        required:true
    },
    Capacity:{
        type:Number,
        required:true
    },
    Reviews:{
        stars:Number,
        Review:String,
        PostedBy:Types.ObjectId
    },
    rating:{
        type:Number
    }


}, {
    timestamps: true
})
const HotelModel = model('Hotel', HotelSchema)
export default HotelModel
