const express = require('express')
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const router = express.Router()

// Make user using post request on /api/auth
router.post('/', [
    body('name', 'Enter a valid name').isLength({ min: 3, max: 25 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 character long').isLength({ min: 8 })
], async (req, res) => {

    const result = validationResult(req);
    if (result.isEmpty()) {
        User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        }).then(user => res.json(user))
        .catch(error => {
            res.json({error: "Please enter a unique value of email!", message: error.message })
        })
        
    } else {
        return res.send({ errors: result.array() });
    }
})

module.exports = router