const express = require('express');
const { getTranscriptByCallId } = require('../controllers/transcriptController');

const router = express.Router();

router.get('/:callId', getTranscriptByCallId);

module.exports = router;
