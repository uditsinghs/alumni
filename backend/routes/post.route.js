import express from 'express';
import { authenticateUser, authorizeRoles } from '../middlewares/isAuthenticated.js';
import { commentPost, createPost, deleteComment, deletepost, editPost, getAllComment, getLikesCount, getPosts, getSinglePost, likeAndDislikePost } from '../controllers/post.controller.js';
import { upload } from '../middlewares/multer.js';
const router = express();

router.post('/create', authenticateUser, authorizeRoles("alumni"), upload.single("image"), createPost);
router.delete('/delete/:postId', authenticateUser, authorizeRoles("alumni"), deletepost);
router.put('/edit/:postId', authenticateUser, authorizeRoles("alumni"), upload.single("image"), editPost);
router.get('/get', getPosts);
router.get('/get/:postId', getSinglePost);
router.get('/getcomment/:postId', getAllComment);
router.put('/comment/:postId', authenticateUser, commentPost);
router.delete('/deletecomment/:postId/:commentId',authenticateUser,deleteComment);
router.put('/like/:postId',authenticateUser,likeAndDislikePost);
router.get('/likecount/:postId', getLikesCount);
export default router;