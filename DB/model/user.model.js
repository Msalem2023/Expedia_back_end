import { Types,Schema,model } from "mongoose";

const userSchema = new Schema ({
    UserName:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    Password:{
        type:Number,
        required:true
    },

    Img:{
        type:String,
        default:""
        },
    Bookings:{
        type:[String],
    },
    Points:{
        type:Number,
        default:0
    },
    EmailConfirmed:{
        type:Boolean,
        default:false
    },Phone:{
        type:Number,
    },Gender:{
        type:String
    }
   
},{
    toJSON: { virtuals: true },
    timestamps:true
})
userSchema.virtual("reservations",{
    ref:"reservation",
    foreignField: "userId",
localField: "_id"

})
const userModel = model('user',userSchema)
export default userModel
