import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    availability: {
        type: String,
        enum: ['available', 'unavailable'],
        required: true
    }
});

const doctor=mongoose.model("doctor",doctorSchema);
export default doctor;