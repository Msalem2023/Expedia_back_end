import {Router} from 'express'
import { getRoom, selectedHotel, selectedroom, sendRoomData, update } from './controller/room.js'
import { auth } from '../../middleware/auth.js'
const router = Router()

router.post('/room',getRoom)
router.get('/sendData',sendRoomData)
router.get('/:id',selectedHotel)
router.get("/Booking/:roomId",selectedroom)
router.get("/update/:id",auth,update)




export default router