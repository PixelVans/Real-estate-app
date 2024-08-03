import express from 'express';
const router = express.Router();
import {signup,signin} from '../controllers/auth-controller.js'

router.post('/sign-up', signup)
router.post('/sign-in', signin)


export default router