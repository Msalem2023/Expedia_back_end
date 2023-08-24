import roomModel from "../../../../DB/model/room.model.js"
import userModel from "../../../../DB/model/user.model.js"

export const getRoom = async(req,res,next)=>{
    const {RoomType,Policy,Amenties,Img,Payment,Price,NumberOfBed,Availablility,Capacity,TypeOfBed,HotelId}=req.body
    const roomData= await roomModel.create({RoomType,Policy,Amenties,Img,Payment,Price,NumberOfBed,Availablility,Capacity,TypeOfBed,HotelId})
    return res.json({message:'done',roomData})
}
export const sendRoomData= async(req,res,next)=>{
    const data= await roomModel.find()
    return res.json({message:"here you are",data})
}
export const selectedHotel=async(req,res,next)=>{
    try {
        const{id}=req.params
        const Hotel=await roomModel.find({HotelId:id}).populate([{
            path:"HotelId"
        }])
        return res.json({message:"here you are",Hotel})
        
    } catch (error) {
        return res.json({message:"something went wrong",error})
        
    }
}
export const selectedroom=async(req,res,next)=>{
    const id =req.params.roomId
    console.log(id)
    const room=await roomModel.find({_id:id})
    return res.json({message:"Done",room})
}
export const update=async(req,res,next)=>{
    try {
        const{id}=req.params
        const Hotel=await roomModel.find({HotelId:id})
        return res.json({message:"here you are",Hotel})
        
    } catch (error) {
        return res.json({message:"something went wrong",error})
        
    }
}