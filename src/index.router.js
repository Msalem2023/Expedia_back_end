import connection from "../DB/Connection.js"
import userRouter from "./modules/user/user.router.js"
import roomRouter from "./modules/room/room.router.js"
import hotelRouter from"./modules/hotel/hotel.router.js"
import bookingRouter from"./modules/Reservation/reservation.router.js"


const bootstrap=(app,express)=>{
    connection()
    app.use(express.json())
    app.use('/Hotel',hotelRouter)
    app.use('/rooms',roomRouter)
    app.use('/user',userRouter)
    app.use('/reservation',bookingRouter)


}
export default bootstrap