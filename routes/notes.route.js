
const express = require('express');
const {
    CreateNotes,
    getLoggedUserNote,
    updateUserData,
    deleteNote
} = require('../controllers/notes.controller');
const { authenticateUser } = require('../middleware/authentication');

const noteRouter = express.Router();


noteRouter.post("/create", authenticateUser, CreateNotes)
noteRouter.get("/get", authenticateUser, getLoggedUserNote)
noteRouter.patch("/update/:id", authenticateUser, updateUserData)
noteRouter.delete("/delete/:id", authenticateUser, deleteNote)

module.exports = { noteRouter }