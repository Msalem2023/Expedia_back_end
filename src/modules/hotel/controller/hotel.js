import HotelModel from "../../../../DB/model/Hotel.model.js"

export const getUserPreferrences =async(req,res,next)=>{
    try {
        
        const {HotelName,Price,Total,Img,Availability,Policy,Payment,Location,Amenities,Meal,Capacity}=req.body
        const saveData= await HotelModel.create({HotelName,Price,Total,Img,Availability,Policy,Payment,Location,Amenities,Meal,Capacity})
        return res.json({message:"done",saveData})
    } catch (error) {
        return res.json(error)
    }

}
export const sendData= async(req,res,next)=>{
    try {
        const data= await HotelModel.find()
        return res.json({message:"done",data})
        
    } catch (error) {
        res.json(error)
    }
}
export const search = async(req,res,next)=>{
    const {Location}=req.query
    const result= await HotelModel.find({Location:Location})
    return res.json({message:"here you are",result})
}
export const TopDeals= async(req,res,next)=>{
    const data= await HotelModel.find()
    return res.json({message:"here you are",data})
}
export const advancedSearch=async(req,res,next)=>{
    const{destination,Price,Property,Amenities,Policy,Meal}=req.query
    const data= await HotelModel.find({Location: destination})
    const Newdata=await HotelModel.find({$and:[{Location: destination},{$or:[{Meal:Meal },{Policy:Policy},{Price: {$lt:Price}},{Amenities:Amenities},{HotelName:Property}]}]})
     return res.json({message:"done",data,Newdata})
}
// export const multipleSearch=async(req,res,next)=>{
//     const{firstinput,secondInput}=req.query
//     console.log(firstinput)
//     console.log(req.query)
//     const data= await HotelModel.find({$and: [{Location: firstinput},
//     {Price: secondInput}]})
//     return res.json({data})
// }