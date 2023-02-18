
const Note = require("../models/Note");

const CreateNotes = async (req, res) => {
    // console.log(req.body)
    const { title, desc, userID } = req.body;

    try {
        if (!title || !desc) {
            res.status(400).send({ msg: "All field are required" })
        } else {

            const newNotes = new Note({
                title,
                desc,
                userId: userID
            })

            await newNotes.save()
            res.status(200).send({ msg: "Note created succssfully", note: newNotes })
        }
    } catch (error) {
        res.status(500).send({ error: "Internel server error" })
    }


}

const getLoggedUserNote = async (req, res) => {
    const userId = req.body.userID
    const data = await Note.find({ userId })
    try {
        if (!data) {
            res.status(200).send({ msg: "Data not found" })
        } else {
            res.status(200).send(data)
        }
    } catch (error) {
        res.status(500).send({ error: "Internel error" })
    }

}

const updateUserData = async (req, res) => {
    const id = req.params.id
    const userId = req.body.userID
    const data = await Note.findOne({ _id: id })

    // console.log(data,"data") 👍👍👍 this will give me object data according to passing id
    // http://localhost:8080/notes/update/63d340f62c7d9ddde44b1cdb
    // here this ➡️ 63d340f62c7d9ddde44b1cdb id will give whole object where i can get userId

    try {
        if (userId === data.userId) {
            await Note.findByIdAndUpdate({ _id: id }, req.body);
            res.status(200).send({ msg: "Data updated success" })
        } else {
            res.status(400).send({ msg: "You are not allowed" })
        }
    } catch (error) {
        res.status(500).send({ error: "Internel server error" })
    }
}

const deleteNote= async (req,res)=>{
    const id = req.params.id
    const userId = req.body.userID
    const data = await Note.findOne({ _id: id })

    try {
        if (userId === data.userId) {
            await Note.findByIdAndDelete({ _id: id });
            res.status(200).send({ msg: "Note deleted success" })
        } else {
            res.status(400).send({ msg: "You are not allowed" })
        }
    } catch (error) {
        res.status(500).send({ error: "Internel server error" })
    }
}

module.exports = {
    CreateNotes,
    getLoggedUserNote,
    updateUserData,
    deleteNote
}
// title,desc