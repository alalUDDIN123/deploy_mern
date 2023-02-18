

const Note = require("../models/Note");
const Users = require("../models/User")
const getAllUser = async (req, res) => {
    const userId = req.body.userID
    // console.log(userId)
    const data = await Users.findOne({ _id: userId })
    // console.log(data.role)
    if (data.role === "admin") {
        const allUser = await Users.find({ role: { $ne: "admin" } });
        res.status(200).send(allUser)
    } else {
        res.status(400).send({ msg: "Sorry ! You are not authorized" })
    }
}


const deleteUser=async(req,res)=>{
    const id=req.params.id
    // console.log(id)
     const findUser= await Users.findOne({_id:id})
     if( !findUser){
       return  res.status(404).send({message:`User not found with id : ${id}`})
     }
     try {
        await findUser.remove();
        res.status(200).send({message:`User deleted succes with id : ${id}`})
     } catch (error) {
        res.status(500).send({msg:"Someting went wrong in the server",errro: error})
     }

}

const getAllNotes = async (req, res) => {
    const userId = req.body.userID
    const data = await Users.findOne({ _id: userId })

    if (data.role === "admin") {
        const Notes = await Note.find({});
        // console.log('Hurray you are admin 😄😄😄')
        res.status(200).send({Notes:Notes,total:Notes.length})
    } else {
        // console.log(`You are not allowed`)
        res.status(400).send({ msg: "Only Admin can access" })
    }
}

const deleteNote=async(req,res)=>{
    const id=req.params.id
    // console.log(id)
     const findNote= await Note.findOne({_id:id})
     if( !findNote){
       return  res.status(404).send({message:`Note not found with id : ${id}`})
     }
     try {
        await findNote.remove();
        res.status(200).send({message:`Note deleted succes with id : ${id}`})
     } catch (error) {
        res.status(500).send({msg:"Someting went wrong in the server",errro: error})
     }

}

const UpdateNote=async(req,res)=>{
    const id=req.params.id
    // console.log(id)
     const findNote= await Users.findOne({_id:id})
     if( !findNote){
       return  res.status(404).send({message:`Note not found with id : ${id}`})
     }
     try {
        await Note.findByIdAndUpdate({_id:id},req.body)
        res.status(200).send({message:`Note updated succes with id : ${id}`})
     } catch (error) {
        res.status(500).send({msg:"Someting went wrong in the server",errro: error})
     }

}

module.exports = {
    getAllUser,
    getAllNotes,
    deleteUser,
    deleteNote,
    UpdateNote
}