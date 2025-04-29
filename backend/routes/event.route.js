import express from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares/isAuthenticated.js';
import { upload } from '../middlewares/multer.js';
import { createEvent, deleteEvent, getAllEvents, getEventsRegisteredUsers, getSingleEvent, registerForEvent, updateEvent } from '../controllers/Event.controller.js';
const router = express();
router.post('/create', authenticateUser, authorizeRoles("admin"), upload.single("image"), createEvent);
router.get('/getall', authenticateUser, getAllEvents)
router.get('/get/:eventId', authenticateUser, getSingleEvent)
router.delete('/delete/:eventId', authenticateUser, authorizeRoles("admin"), deleteEvent)
router.put('/edit/:eventId', authenticateUser, authorizeRoles("admin"),upload.single("image"), updateEvent);
router.put('/apply/:eventId', authenticateUser, registerForEvent);
router.get('/getapplied', authenticateUser, authorizeRoles("admin"),getEventsRegisteredUsers)
export default router;