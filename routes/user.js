const express = require('express')
const router = express.Router()
const { signup,login,profile } = require('../controllers/user')
const { requireSignin } = require('../middlewares/user')

router.post('/register', signup);
router.post('/login', login);
router.get('/profile', requireSignin, profile);


module.exports = router;