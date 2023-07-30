const express = require('express');
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetchuser')
const dotenv = require('dotenv');
let cnf = dotenv.config();

const router = express.Router()

const JWT_SECRET = process.env.JWT_SECRET

// ROUTE 1: Make user using post request on /api/auth/createuser
router.post('/createuser/', [
    body('name', 'Enter a valid name').isLength({ min: 3, max: 25 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 character long').isLength({ min: 8 })
], async (req, res) => {

    // Check for errors and return errors if they exists
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            // Check wether a user exists with same email already
            let user = await User.findOne({ email: req.body.email }).exec();
            if (user) {
                return res.status(400).json({ error: "Sorry a user with this email already exists!", user: user })
            } else {
                // create user if it doesn't exists
                const salt = await bcrypt.genSalt(10)
                const secPass = await bcrypt.hash(req.body.password, salt)
                user = await User.create({
                    name: req.body.name,
                    email: req.body.email,
                    password: secPass
                })

                const payload = {
                    user: {
                        id: user.id
                    }
                }
                const authToken = jwt.sign(payload, JWT_SECRET)
                // console.log(jwtData);
                return res.json({ authToken })
            }

        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    } else {
        return res.send({ errors: result.array() });
    }

})


// ROUTE 2: Authenticate user using post request on /api/auth/login
router.post('/login/', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 8 character long').isLength({ min: 8 }).exists()
], async (req, res) => {

    // Check for errors and return errors if they exists
    const result = validationResult(req);
    if (result.isEmpty()) {

        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email }).exec()
            if (!user) {
                return res.status(400).json({ error: "Please try again with correct credentials!" })
            } else {

                const passwordCompare = bcrypt.compare(password, user.password)
                if (!passwordCompare) {
                    return res.status(400).json({ error: "Please try again with correct credentials!" })
                } else {

                    const payload = {
                        user: {
                            id: user.id
                        }
                    }
                    const authToken = jwt.sign(payload, JWT_SECRET)
                    return res.json({ authToken })
                }
            }

        } catch (error) {
            return res.status(500).json({ error })
        }
    } else {
        return res.send({ errors: result.array() });
    }
})


// ROUTE 3: Get loggedin user details using post request on /api/auth/getuser
router.post('/getuser/', fetchuser , async (req, res) => {
    try {
        const userId = req.user.id
        const user = await User.findById(userId).select('-password').exec()
        res.send(user)
    } catch (error) {
        res.status(500).json({error: "Internal Server Error"})
    }
})

module.exports = router