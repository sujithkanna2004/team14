import {Router,request,response} from "express";
import Appointment from '../model/appointment.js';
import Patient from '../model/patient.js';
import Doctor from '../model/doctor.js';

const router = Router();


router.post('/appointments', async (req, res) => {
    try {
        const { patientId, doctorId, appointmentDate } = req.body;

        
        const patient = await Patient.findById(patientId);
        const doctor = await Doctor.findById(doctorId);
        if (!patient || !doctor) {
            return res.send({ message: 'Patient or Doctor not found' });
        }

        const appointment = new Appointment({ patientId, doctorId, appointmentDate });
        await appointment.save();
        res.send(appointment);
    } catch (error) {
        res.send(error);
    }
});


router.get('/appointments', async (req, res) => {
    try {
        const { doctorId, patientId } = req.query;

        let filter = {};
        if (doctorId) {
            filter.doctorId = doctorId;
        }
        if (patientId) {
            filter.patientId = patientId;
        }

        const appointments = await Appointment.find(filter).populate('doctorId', 'name specialization').populate('patientId', 'name age');
        res.send(appointments);
    } catch (error) {
        res.send(error);
    }
});

