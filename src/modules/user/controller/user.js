import userModel from "../../../../DB/model/user.model.js"
import sendEmail from "../../../utilies/email.js"
import bcrypt from "bcryptjs";
import  jwt  from "jsonwebtoken";



export const SignUp = async (req, res, next) => {
    try {
        const { Email, UserName, Password} = req.body
            const verify= await userModel.findOne({Email})
            if(verify){
                return res.json({message:"Email already Exists"})
            }else{
                // const hash = await bcrypt.hashSync(verify.Password, 10);
                const NewUser= await userModel.create({Email, UserName, Password})
                const token=jwt.sign({id:NewUser._id,Email:NewUser.Email},process.env.SIGNITURE)
                const link=`http://localhost:4000/user/confirmEmail/${token}`
                await sendEmail({to:Email,subject:"confirm your email",html:`<!DOCTYPE html>
                <html>
                <head>
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
                <style type="text/css">
                body{background-color: #88BDBF;margin: 0px;}
                </style>
                <body style="margin:0px;"> 
                <table border="0" width="50%" style="margin:auto;padding:30px;background-color: white;border:1px solid #630E2B;">
                <tr>
                <td>
                <table border="0" width="100%">
                <tr>
                <td>
                <h5>
                    <img width="10px" src="https://th.bing.com/th/id/R.c8805251f4e8fda70f83e70b01416066?rik=kmRmaJzHM2aULg&riu=http%3a%2f%2fwww.update247.com.au%2fimages%2flogo_expedia.png&ehk=P7x%2fnhjHlR%2fTst%2fZLZIXCAkin4mQDTZQvNaAy7MBdV8%3d&risl=&pid=ImgRaw&r=0"/>
                </h5>
                </td>
                <td>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
                <tr>
                <td style="background-color:#191E3B;height:100px;font-size:50px;color:yellow;">
                <img width="50px" height="50px" background-color:#191E3B src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703716/Screenshot_1100_yne3vo.png">
                </td>
                </tr>
                <tr>
                <td>
                <h1 style="padding-top:25px; color:#630E2B">Email Confirmation</h1>
                </td>
                </tr>
                <tr>
                <td>
                <p style="padding:0px 100px;">
                </p>
                </td>
                </tr>
                <tr>
                <td>
                <a href="${link}" style="margin:10px 0px 30px 0px;padding:10px 20px;color:#191E3B; background-color:white ">Verify Email address</a>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                <tr>
                <td>
                <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
                <tr>
                <td>
                <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
                </td>
                </tr>
                <tr>
                <td>
                <div style="margin-top:20px;">
                </div>
                </td>
                </tr>
                </table>
                </td>
                </tr>
                </table>
                </body>
                </html>`})
    
            }
    } catch (error) {
        res.json({message:"something went wrong",error})
        
    }
    }


export const confirmEmail= async(req,res,next)=>{
    const {token}=req.params
    const decoded=jwt.verify(token,process.env.SIGNITURE)
    const user= await userModel.findOneAndUpdate({_id:decoded.id},{EmailConfirmed:true})
    return user ? res.redirect("http://localhost:3000/signIn"):res.send(`<a href="http://localhost:3000/SignUp">OOOPS NOT YET A MEMBER</a>`)

}
export const SignIn = async (req, res, next) => {
    const { Email, Password } = req.body
    const user = await userModel.findOne({ Email })
    if(!user) {
        return res.json({ Message: "No User Exists For Provided Email" })
    }else {
        if(user.EmailConfirmed==false){
            res.json({message:"email not confirmed yet"})
        }else{
            // const match= bcrypt.compareSync(Password,user.Password)
            if(Password==user.Password){
                const token=jwt.sign({id:user._id,Email:user.Email},process.env.SIGNITURE)
                return res.json({message:"Awsome",token})

            }else{
                return res.json({message:"email or Password is incorrect"})
        }
    
        }
    }
    
}
export const ChangePassword= async(res,req,next)=>{
    const{Email,OldPassword,NewPassword}=req.body
    const verifyEmail =await userModel.findOne({Email})
    if(!verifyEmail){
        return res.json({message:'email does not exists'})
    }else{
        const match=bcrypt.compareSync(OldPassword,verifyEmail.Password)
        if(!match){
            return res.json({message:'incorrect Password'})
        }else{
            const UpdatePassword= await userModel.findOneAndUpdate({Email},{Password:NewPassword},{new:true})
        }
    }
}
export const Profile=async(req,res,next)=>{
    const userDetails= await userModel.find({Email:req.user.Email}).populate([{
        path:"reservations",select:"selectedroom.Img",limit:4
    }])
    res.json({message:"here you are",userDetails})
}
export const ProfileImage=async(req,res,next)=>{
    const id=req.user.id
    console.log(req.file)
    const filename=req.file.filename
    const update=await userModel.findByIdAndUpdate({_id:id},{Img:filename})
    return res.json({message:"done",update})
}
