import express from 'express';
import { deleteUser, getAllUsers, getOneUser, updateUser } from '../controllers/user.js';
import { verifyAdmin, verifyToken, verifyUser } from '../middleware/verifyToken.js';
const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req, res, next) => {
//   res.send("hello user, you are now logged in")
// })
// router.get('/checkuser/:id', verifyUser, (req, res, next) => {
//   res.send("hello user, you are now logged in and you can delete your account")
// })
// router.get('/checkadmin/:id', verifyAdmin, (req, res, next) => {
//   res.send("hello admin, you are now logged in and you can delete all accounts")
// })

router.put('/:id', verifyUser, updateUser)
router.delete('/:id', verifyUser, deleteUser)
router.get('/:id', verifyUser, getOneUser)
router.get('/', verifyAdmin, getAllUsers)

export default router;