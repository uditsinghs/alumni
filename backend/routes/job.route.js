import express from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares/isAuthenticated.js';
import { createJob, deleteJob, getJob, getJobs, updateJob } from '../controllers/job.controller.js';


const router = express();
router.post('/create', authenticateUser, authorizeRoles("alumni"), createJob)
router.get('/getall', authenticateUser, getJobs);
router.get('/get/:jobId', authenticateUser, getJob);
router.delete('/delete/:jobId', authenticateUser, authorizeRoles("alumni"), deleteJob)
router.put('/edit/:jobId', authenticateUser, authorizeRoles("alumni"), updateJob)
export default router;