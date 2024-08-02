import express from 'express';
const router = express.Router();
import {signup} from '../controllers/auth-controller.js'

router.post('/sign-up', signup)


export default router