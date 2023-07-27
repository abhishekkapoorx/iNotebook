const express = require('express')
const User = require('../models/User')
const router = express.Router()

// Make user using post request on /api/auth
router.post('/', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body)
    await user.save()
    res.json(req.body)
})

module.exports = router