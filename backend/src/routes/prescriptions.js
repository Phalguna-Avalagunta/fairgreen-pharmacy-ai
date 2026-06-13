const express = require('express');
const { createPrescription, listPrescriptions } = require('../controllers/prescriptionController');

const router = express.Router();

router.post('/', createPrescription);
router.get('/', listPrescriptions);

module.exports = router;
