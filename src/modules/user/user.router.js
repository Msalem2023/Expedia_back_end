import { Router } from "express";
import { ChangePassword, Profile, ProfileImage, SignIn, SignUp, confirmEmail} from "./controller/user.js";
import { validation } from "../../middleware/validation.js";
import * as validators from "../auth/validation.js"
import { auth } from "../../middleware/auth.js";
import { fileUpload, fileValidation } from "../../utilies/multer.js";
const router=Router()
router.post('/SignIn',validation(validators.SignIn),SignIn)
router.get('/confirmEmail/:token',confirmEmail)
router.post('/SignUp',validation(validators.Signup), SignUp)

router.get('/UpdatePassword',ChangePassword)
router.get('/Profile',auth,Profile)
router.post('/upload',auth,fileUpload('user/profile',fileValidation.image).single('image'),ProfileImage)

export default router