import express from 'express';
import { deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js';
const router = express.Router();

router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.get('/:id', getOneUser)
router.get('/', getAllUsers)

export default router;