import express from 'express';
import { upload } from '../middlewares/multer.js'

import { changeUserRole, deleteUser, getAllAlumni, getallusers, getLoggedinUser, getSingleAlumni, getStats, getUnVerifiedAlumnies, loginUser, LogoutUser, registerUser, updateProfile, verifiedAlumni } from '../controllers/user.controller.js';
import { authenticateUser, authorizeRoles } from '../middlewares/isAuthenticated.js';
const router = express();
router.post("/register", registerUser);
router.put("/verify/:userId", authenticateUser, authorizeRoles("admin"), verifiedAlumni);
router.post('/login', loginUser);
router.get('/me', authenticateUser, getLoggedinUser);
router.get('/allalumnies', getAllAlumni);
router.get('/getuser/:userId', authenticateUser, getSingleAlumni)
router.get('/unverified', authenticateUser, authorizeRoles("admin"), getUnVerifiedAlumnies);
router.get('/logout', LogoutUser);
router.get('/getall', authenticateUser, authorizeRoles("admin"), getallusers);
router.delete('/deleteuser/:userId', authenticateUser, authorizeRoles("admin"), deleteUser);
router.put('/change/:userId', authenticateUser, authorizeRoles("admin"), changeUserRole);
router.put('/edit', authenticateUser, upload.single("profileImage"), updateProfile);
router.get('/stats',authenticateUser,getStats)


export default router;