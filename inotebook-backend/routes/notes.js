const express = require('express')
const fetchuser = require('../middleware/fetchuser')
const Notes = require('../models/Notes')
const { body, validationResult } = require('express-validator');
const router = express.Router()

// ROUTE 1: Get all the notes using GET: '/api/notes/fetchallnotes. Login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id }).exec()
    res.json(notes)
})

// ROUTE 2: Add notes using POST: '/api/notes/addnote. Login required
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 3 }),
], async (req, res) => {

    // Check for errors and return errors if they exists
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const { title, description, tag } = req.body
            const note = new Notes({ title, description, tag, user: req.user.id })
            const savedNote = await note.save()
            return res.send(savedNote)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    } else {
        return res.send({ errors: result.array() });
    }
})

// ROUTE 3: Update existing notes using PUT: '/api/notes/updatenote. Login required
router.put('/updatenote/:id', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters long').isLength({ min: 3 }),
], async (req, res) => {

    // Check for errors and return errors if they exists
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            const { title, description, tag } = req.body

            // create new note object
            const newNote = {}
            if (title) { newNote.title = title }
            if (description) { newNote.description = description }
            if (tag) { newNote.tag = tag }

            // Find note to be updated and update it
            // const note = await Notes.findByIdAndUpdate()
            const note = await Notes.findById(req.params.id).exec()
            if (!note) { res.status(404).send("Not Found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }

            updatedNote = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true }).exec()
            return res.send({ updatedNote })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    } else {
        return res.send({ errors: result.array() });
    }
})

// ROUTE 3: Update existing notes using PUT: '/api/notes/deletenote. Login required
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // Check for errors and return errors if they exists
    const result = validationResult(req);
    if (result.isEmpty()) {
        try {
            // Find a note by its ID
            const note = await Notes.findById(req.params.id).exec()
            if (!note) { res.status(404).send("Not Found") }
            if (note.user.toString() !== req.user.id) {
                return res.status(401).send("Not Allowed")
            }

            deletedNote = await Notes.findByIdAndDelete(req.params.id).exec()
            return res.send({"Success": "Note has been deleted", deletedNote })
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: error })
        }
    } else {
        return res.send({ errors: result.array() });
    }
})
module.exports = router