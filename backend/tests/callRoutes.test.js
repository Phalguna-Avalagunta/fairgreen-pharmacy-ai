const request = require('supertest');
const { app } = require('../src/server');
const { resetStore, state } = require('../src/utils/store');

describe('Call management routes', () => {
  beforeEach(() => {
    resetStore();
  });

  it('answers an incoming call and stores transcript entries', async () => {
    const response = await request(app)
      .post('/api/calls/incoming')
      .send({ From: '+441234567890', SpeechResult: 'What are your opening hours?' });

    expect(response.status).toBe(200);
    expect(response.text).toContain('<Say');
    expect(state.calls).toHaveLength(1);
    expect(state.transcripts).toHaveLength(2);
    expect(state.calls[0].category).toBe('general_inquiry');
  });

  it('creates prescription automation entry for prescription calls', async () => {
    await request(app)
      .post('/api/calls/incoming')
      .send({
        From: '+441234567890',
        SpeechResult: 'I need a repeat prescription for amlodipine',
        patient_name: 'Jane Doe',
        medication: 'Amlodipine',
        gp_surgery: 'Town GP',
      });

    expect(state.prescriptions).toHaveLength(1);
    expect(state.prescriptions[0].patient_name).toBe('Jane Doe');
  });

  it('queues callbacks for complex requests', async () => {
    await request(app)
      .post('/api/calls/incoming')
      .send({
        From: '+441234567890',
        SpeechResult: 'Please ask a pharmacist to call me back urgently',
        patient_name: 'Alex',
      });

    expect(state.callbackQueue).toHaveLength(1);
    expect(state.callbackQueue[0].priority).toBe('high');
  });
});
