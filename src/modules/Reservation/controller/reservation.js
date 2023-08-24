import HotelModel from '../../../../DB/model/Hotel.model.js'
import reservationModel from '../../../../DB/model/reservation.model.js'
import roomModel from '../../../../DB/model/room.model.js'
import userModel from '../../../../DB/model/user.model.js'
export const addOne = async (req, res, next) => {
    const id = req.user.id
    const { FirstName, LastName, Phone, Email, destination, checkin, checkout, option, subtotal, total, taxes, localtaxes, selectedroom } = req.body
    const Booking = await reservationModel.create({ FirstName, LastName, Phone, Email, destination, checkin, checkout, option, subtotal, total, taxes, localtaxes, selectedroom, userId: id })
    console.log(selectedroom._id)
    const Availability = await roomModel.findByIdAndUpdate({ _id: selectedroom._id }, { Availablility: false }, { new: true })
    return res.json({ message: "done", Booking })
}
export const MyBooking = async (req, res, next) => {
    const id = req.user.id
    const booking = await reservationModel.find({ userId: id })
    return res.json({ message: "done", booking })
}
export const GuestDetails = async (req, res, next) => {
    try {

        const { id } = req.params
        const { FirstName, LastName, Email } = req.body
        const update = await reservationModel.findByIdAndUpdate({ _id: id }, { FirstName, LastName }, { new: true })
        return res.json({ message: "done", update })
    } catch (error) {
        return res.json({ message: "error occured", error })

    }
}
export const ModifyDate = async (req, res, next) => {
    const { id } = req.params
    const { checkin, checkout, option } = req.body
    const update = await reservationModel.findByIdAndUpdate({ _id: id }, { checkin, checkout, option }, { new: true })

    return res.json({ message: "room got updaed successfully", update })



}
export const ModifyRoom = async (req, res, next) => {
    const { BookingId } = req.params
    const { roomId } = req.params
    const selectedroom = await roomModel.findById({ _id: roomId })
    const update = await reservationModel.findByIdAndUpdate({ _id: BookingId }, { selectedroom }, { new: true })
    return res.json({ message: "room got updaed successfully", update })
}
export const destroy=async(req,res,next)=>{
 const {id} =req.params
 const deleteBooking=await reservationModel.findByIdAndDelete({_id:id})
 return res.json({message:"Booking deleted successfully"})
}
export const Addreview=async(req,res,next)=>{
    const id=req.user.id
    const {Review,Rate,HotelId,BookingId}=req.body
    const hotel=await reservationModel.findById({_id:BookingId})
    // const alreadyReviewed=await hotel.findone({'Reviews.PostedBy':id})
    // if(alreadyReviewed){
    //     const updateReview=await hotel.Reviews.findByIdAndUpdate({PostedBy:id},{stars:Rate,Review,PostedBy:id},{new:true})
    // }else{
        if(hotel.Reviews.PostedBy?.length){

            if (JSON.stringify(hotel.Reviews.PostedBy).includes(JSON.stringify(id))) {
               return res.json({ Message: "reviewed already made" })
            }
        }else{

            const insertReview=await HotelModel.findByIdAndUpdate({_id:HotelId},{$push:{
                Reviews:{
                    stars:Rate,
                    Review,
                    PostedBy:id
                }
            }})
            const insert=await reservationModel.findByIdAndUpdate({_id:BookingId},{$push:{
                Reviews:{
                    stars:Rate,
                    Review,
                    PostedBy:id
                }
                }})
        
        return res.json({message:"done"})
        }
}
export const AllReviews=async(req,res,next)=>{
    const id=req.user.id
    console.log(id)
    const allreviews= await reservationModel.find({"Reviews.PostedBy":id}).populate([{
        path:'userId'
    }]).select("Reviews ")
    // const userDetails=await userModel.find({_id:id})
    // .populate([{
    //     path:'reservations'
    // }])
    return res.json({allreviews})
}