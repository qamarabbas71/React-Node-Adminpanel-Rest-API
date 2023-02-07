import express from 'express';
import {getUsers, getSingleUser} from '../controllers/userController.js'

const router = express.Router();

router.get("/user", getUsers)
router.get("/singleUser/:id", getSingleUser)

export default router;