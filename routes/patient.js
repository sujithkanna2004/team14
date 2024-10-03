import {Router,request,response} from "express"; 
import Patient from '../model/patient.js';

const router = Router();


router.post('/patients', async (req, res) => {
    try {
        const { name, age, email, phoneNumber, gender, admissionDate } = req.body;
        const patient = new Patient({ name, age, email, phoneNumber, gender, admissionDate });
        await patient.save();
        res.send(patient);
    } catch (error) {
        res.send(error);
    }
});


router.get('/patients', async (req, res) => {
    try {
        const { email, phoneNumber } = req.query;
        const patient = await Patient.findOne({ $or: [{ email }, { phoneNumber }] });
        if (!patient) {
            return res.send({ message: 'Patient not found' });
        }
        res.send(patient);
    } catch (error) {
        res.send(error);
    }
});