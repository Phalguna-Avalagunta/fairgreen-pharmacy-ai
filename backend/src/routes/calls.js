const express = require('express');
const { handleIncomingCall, listCalls, getCallById } = require('../controllers/callController');

const router = express.Router();

router.post('/incoming', handleIncomingCall);
router.get('/', listCalls);
router.get('/:id', getCallById);

module.exports = router;
