const twilio = require('twilio');
const { classifyQuery, generateResponse } = require('./aiController');
const { createCall, updateCall, addTranscript, addPrescription, addCallback, state } = require('../utils/store');

const mapPriority = (text = '') => (text.toLowerCase().includes('urgent') ? 'high' : 'normal');

const welcomeMessage = 'Hello, this is Fairgreen Pharmacy AI assistant. How can I help you today?';

const handleIncomingCall = async (req, res, next) => {
  try {
    const phone = req.body.From || req.body.phone_number || 'unknown';
    const query = req.body.SpeechResult || req.body.query || '';
    const call = createCall({
      phone_number: phone,
      call_duration: 0,
      start_time: new Date().toISOString(),
      end_time: null,
      status: 'active',
      external_id: req.body.CallSid || null,
      category: 'general_inquiry',
    });

    if (query) {
      addTranscript({ call_id: call.id, speaker: 'patient', text: query });
      const classification = await classifyQuery(query);
      const category = classification.category || 'general_inquiry';
      updateCall(call.id, { category, status: 'completed', end_time: new Date().toISOString() });

      if (category === 'prescription_request') {
        addPrescription({
          patient_name: req.body.patient_name || 'Unknown',
          patient_phone: phone,
          medication: req.body.medication || 'Not provided',
          gp_surgery: req.body.gp_surgery || 'To confirm',
          status: 'pending_gp_contact',
        });
      }

      if (category === 'callback') {
        addCallback({
          patient_name: req.body.patient_name || 'Unknown',
          reason: query,
          priority: mapPriority(query),
        });
      }

      const responseText = await generateResponse({ category, query });
      addTranscript({ call_id: call.id, speaker: 'ai', text: responseText });

      const twiml = new twilio.twiml.VoiceResponse();
      twiml.say({ voice: 'alice' }, responseText);
      return res.type('text/xml').send(twiml.toString());
    }

    const twiml = new twilio.twiml.VoiceResponse();
    twiml.say({ voice: 'alice' }, welcomeMessage);
    twiml.gather({ input: 'speech', action: '/api/calls/incoming', method: 'POST', language: 'en-GB' });
    return res.type('text/xml').send(twiml.toString());
  } catch (error) {
    return next(error);
  }
};

const listCalls = (req, res) => res.json(state.calls);

const getCallById = (req, res) => {
  const call = state.calls.find((entry) => entry.id === Number(req.params.id));
  if (!call) return res.status(404).json({ message: 'Call not found' });
  return res.json(call);
};

module.exports = {
  handleIncomingCall,
  listCalls,
  getCallById,
};
