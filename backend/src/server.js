import express from "express"
import notesRoutes from './routes/notesRoutes.js'
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js"
import dotenv from "dotenv"
import cors from "cors"

const app = express();

dotenv.config()

const PORT = process.env.PORT || 5001


//middleware
app.use(cors(
    {
        origin: "http://localhost:5173"
    }
));
app.use(express.json());
app.use(rateLimiter);


//console.log(process.env.MONGO_URI)
//Similarly, you can create - 
//app.use('/api/product', productRoutes)
//app.use('/api/payments', paymentRoutes)
app.use('/api/notes', notesRoutes)

//This is out first API where we are listening for get request and handling it properly
//app.get('/api/notes', (req, res) => {
//    res.status(200).send("You have got 10 notes")
//})
//app.post('/api/notes', (req, res) => {
//    res.status(201).json({message: "Note created successfully"})
//})
//app.put('/api/notes:id', (req, res) => {
//    res.status(200).json({message: "Note Updated successfully"})
//})
//app.delete('/api/notes/:id', (req,res) => {
//    res.status(200).jsonp({message:"Post deleted successfully"})
//})

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("Server has started on PORT:", PORT)
    })
})
//Now the DB is connected first and then the server starts listening.

