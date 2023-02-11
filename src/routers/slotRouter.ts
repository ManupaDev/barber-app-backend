import express from "express";
import { getAllSlots, createSlot, deleteSlotById} from "../controllers/slotController";
    
const slotRouter = express.Router();


slotRouter.route('/').get(getAllSlots).post(createSlot);
slotRouter.route('/:id').delete(deleteSlotById);



export default slotRouter;