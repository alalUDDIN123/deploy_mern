const express = require('express');
const {
    getAllUser,
    getAllNotes,
    deleteUser,
    deleteNote,
    UpdateNote,

} = require('../controllers/admin.controller');

const { authenticateUser } = require('../middleware/authentication');
const adminRouter = express.Router()

// admin route
adminRouter.get("/users", authenticateUser, getAllUser);
adminRouter.delete("/users/:id", authenticateUser, deleteUser);

adminRouter.get("/notes", authenticateUser, getAllNotes);
adminRouter.delete("/notes/:id", authenticateUser, deleteNote);
adminRouter.patch("/notes/update/:id", authenticateUser, UpdateNote);

module.exports = adminRouter

