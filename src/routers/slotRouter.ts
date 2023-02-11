import express from "express";
import { getAllSlots, createSlot} from "../controllers/slotController";
    
const slotRouter = express.Router();


slotRouter.route('/').get(getAllSlots).post(createSlot);



export default slotRouter;