import express from "express";
import { getAllAvailabilities, createAvailability, deleteAvailabilityById, getAvailabilityById} from "../controllers/availabilityController";
    
const availabilityRouter = express.Router();

availabilityRouter.route('/').get(getAllAvailabilities).post(createAvailability);
availabilityRouter.route('/:id').get(getAvailabilityById).delete(deleteAvailabilityById);

export default availabilityRouter;