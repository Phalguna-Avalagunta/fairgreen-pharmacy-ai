const { addPrescription, state } = require('../utils/store');

const createPrescription = (req, res) => {
  const { patient_name, patient_phone, medication, gp_surgery } = req.body;
  if (!patient_name || !patient_phone || !medication || !gp_surgery) {
    return res.status(400).json({ message: 'patient_name, patient_phone, medication and gp_surgery are required' });
  }

  const prescription = addPrescription({ patient_name, patient_phone, medication, gp_surgery });
  return res.status(201).json(prescription);
};

const listPrescriptions = (req, res) => {
  return res.json(state.prescriptions);
};

module.exports = {
  createPrescription,
  listPrescriptions,
};
