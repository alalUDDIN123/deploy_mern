const mongoose = require("mongoose");

/* MONGODB CONNECT */

mongoose.set('strictQuery', false);

const ConnectDb = () => {
    mongoose.connect(process.env.MONGO_URL)
    .then(res=>console.log("Database connected successfully"))
    .catch(err=>console.log("Got error while connecting mongoDB"))
}


module.exports=ConnectDb