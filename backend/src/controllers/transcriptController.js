const { state } = require('../utils/store');

const getTranscriptByCallId = (req, res) => {
  const callId = Number(req.params.callId);
  const entries = state.transcripts.filter((entry) => entry.call_id === callId);
  return res.json(entries);
};

module.exports = { getTranscriptByCallId };
