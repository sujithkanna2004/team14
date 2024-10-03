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

router.put('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true });
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.send(appointment);
    } catch (error) {
        res.status(400).send(error);
    }
});


router.delete('/appointments/:id', async (req, res) => {
    try {
        const appointment = await Appointment.findByIdAndDelete(req.params.id);
        if (!appointment) {
            return res.status(404).send({ message: 'Appointment not found' });
        }
        res.send({ message: 'Appointment canceled successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
});

