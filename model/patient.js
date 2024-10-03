import mongoose from 'mongoose';

const patientSchema = new mongoose.Schema({
    name: {
         type: String,
         required: true 
    },
    age: {
         type: Number, 
         required: true
    },
    gender: {
         type: String,
         required: true 
    },
    email: {
         type: String, 
         required: true 
    },
    phoneNumber: {
         type: String, 
         required: true 
    },
    admissionDate: { 
         type: String,
         required: true 
    }
});

const Patient = mongoose.model('Patient', patientSchema);

export default Patient;
