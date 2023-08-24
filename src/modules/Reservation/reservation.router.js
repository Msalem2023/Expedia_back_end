import {Router} from"express"
import { Addreview, AllReviews, GuestDetails, ModifyDate, ModifyRoom, MyBooking, addOne, destroy } from "./controller/reservation.js"
import { auth } from "../../middleware/auth.js"
const router=Router()
router.post('/addOne',auth,addOne)
router.get("/MyBooking",auth,MyBooking)
router.post("/EditInfo/:id",auth,GuestDetails)
router.put("/EditDate/:id",auth,ModifyDate)
router.post("/Editroom/:BookingId/:roomId",ModifyRoom)
router.delete("/delete/:id",auth,destroy)
router.post("/addreview",auth,Addreview)
router.get("/getallreviews",auth,AllReviews)


export default router