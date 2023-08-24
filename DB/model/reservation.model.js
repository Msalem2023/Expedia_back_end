import { Types, Schema, model } from "mongoose";

const reservationSchema = new Schema({
    FirstName: {
        type: String,
        required: true
    },
    LastName: {
        type: String,
        required: true
    },
    Phone: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },

    destination: {
        type: String,
        required: true,
    },
    checkin: {
        type: String,
        required: true,
    },
    checkout: {
        type: String,
        required: true
    },
    option: {
        adult:Number,
        children:Number,
        room:Number
  },
    subtotal: {
        type: String,
        required: true

    },
    total: {
        type: String,
        required: true
    },
    taxes: {
        type: Number,
        required: true
    },
    localtaxes: {
        type: Number,
        required: true
    },
    selectedroom: {
        RoomType:String,
        Policy:String,
        Amenties:[String],
        Img:[String],
        Payment:String,
        TypeOfBed:String,
        _id:Types.ObjectId,
        HotelId:Types.ObjectId



    }, userId:{
        type:Types.ObjectId,
        ref:"user",
    },
    Reviews:{
        stars:Number,
        Review:String,
        PostedBy:Types.ObjectId
    },



}, {
    timestamps: true
})
const reservationModel = model('reservation', reservationSchema)
export default reservationModel
