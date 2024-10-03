import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import modeld from "./model/doctor.js";
import modelp from "./model/patient.js";
import modela from "./model/appointment.js";
import droutes from "./routes/index.js";
import proutes from "./routes/Patient.js";
import aroutes from "./routes/Appointment.js";


const app = express();
dotenv.config();

const PORT = process.env.PORT ;
const MONGO_URI = process.env.MONGO_URI;

app.use(bodyParser.json())
app.use("/d", droutes);
app.use("/p", proutes);
app.use("/a", aroutes);
    


// app.get("/all", (request,response)=>{
//     const name=request.body.name
//     response.send("hello"+name)
// });

app.use("/good", modeld)


// mongoose.connect("mongodb+srv://sujithkannacr7:team14@team14cluster.4ylts.mongodb.net/").then(()=>{
//     console.log("mongodb is connected")
//     app.listen(PORT, ()=>{
//         console.log("server is watching you...."+PORT)
        
//         console.log("my name is ....."+process.env.NAME)
// })
// });


mongoose.connect("mongodb+srv://sujithkannacr7:team14@team14cluster.4ylts.mongodb.net/doctor").then(() => {
    console.log("MongoDB is connected");
    app.listen(PORT, () => {
        console.log("Server is running on port " + PORT);
    });
}).catch((err) => {
    console.error("MongoDB connection error:", err);
});

