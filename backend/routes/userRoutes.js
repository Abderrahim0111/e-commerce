const express = require('express')
const { register, login, logout, updateUser, deleteUser, fetchUsers } = require('../controllers/userControllers')
const router = express.Router()


router.post('/register', register)
router.post('/login', login)
router.get('/logout', logout)
router.put('/updateUser/:userId', updateUser)
router.delete('/deleteUser/:userId', deleteUser)
router.get('/fetchUsers', fetchUsers)


module.exports = router