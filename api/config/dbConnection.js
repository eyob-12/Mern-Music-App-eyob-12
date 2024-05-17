const mongoose = require("mongoose");
async function connectDb() {
    try {
        const connect = await mongoose.connect(process.env.MONGO_CONNECTION_STRING);
        console.log("DATABASE CONNECTED ....");
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
};

module.exports = connectDb;