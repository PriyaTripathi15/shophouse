import  express from 'express';
const router = express.Router();
import { authUser, registerUser, logoutUser, getUserProfile, getUsers, getUserById, updateUserProfile, deleteUser, updateUser } from '../controller/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

// route auth user and get token
router.route('/').post(registerUser).get(protect,admin ,getUsers);
router.post('/login', authUser);
router.post('/logout', logoutUser);
// route get user profile
router.route('/profile').get(protect,getUserProfile).put(protect,updateUserProfile);
// get user by id  by admin
router.route('/:id').delete(protect,admin,deleteUser).get(protect,admin,getUserById).put(protect,admin,updateUser);
export default router;