import express from 'express';
const router = express.Router();
import {signup,signin, google, signOut} from '../controllers/auth-controller.js'

router.post('/sign-up', signup)
router.post('/sign-in', signin)
router.post('/google',google)
router.get('/signout',signOut)


export default router