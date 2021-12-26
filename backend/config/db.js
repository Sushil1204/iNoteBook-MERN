const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const url = 'mongodb+srv://SushilCoder:coder1204@cluster0.3fe3u.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
        const conn= await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true, } );
    } catch (error) {
        console.log(`Error:${error.message}`);
        process.exit();
    }
}

module.exports = connectDB;