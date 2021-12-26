const express = require("express");
const notes = require("./data/notes");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require('./Routes/userRoutes');
const noteRoutes = require('./Routes/noteRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddlewares')
const path = require("path");

const app = express();
dotenv.config();
connectDB();
app.use(express.json())


app.use('/api/users', userRoutes)
app.use('/api/notes', noteRoutes)

// --------------------------Deployment---------------------------------

__dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, "/frontend/build")));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname,'frontend', 'build', 'index.html'))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is running..");
      });
}
// --------------------------Deployment---------------------------------


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server  Started on ${PORT}`)); 