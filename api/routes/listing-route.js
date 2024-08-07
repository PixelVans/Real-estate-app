import express from 'express';
import { createListing, deleteListing, updateUserListing } from '../controllers/listing-controller.js';
import { verifyToken } from '../utils/verifyUser.js';
const router = express.Router();

router.post("/create", verifyToken, createListing)
router.delete("/delete/:id", verifyToken, deleteListing)
router.post("/update/:id", verifyToken, updateUserListing)


export default router