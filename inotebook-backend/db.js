const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/test?readPreference=primary&tls=false&directConnection=true"

const connectToMongo = async () => {
    console.log("Trying to connect")
    await mongoose.connect(mongoURI)
    console.log("Connected")
}

module.exports = connectToMongo;