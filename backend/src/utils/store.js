const state = {
  calls: [],
  transcripts: [],
  prescriptions: [],
  patients: [],
  callbackQueue: [],
};

const nextId = {
  calls: 1,
  transcripts: 1,
  prescriptions: 1,
  patients: 1,
  callbackQueue: 1,
};

const now = () => new Date().toISOString();

const createCall = (data) => {
  const call = { id: nextId.calls++, created_at: now(), ...data };
  state.calls.unshift(call);
  return call;
};

const updateCall = (id, patch) => {
  const call = state.calls.find((entry) => entry.id === Number(id));
  if (!call) return null;
  Object.assign(call, patch);
  return call;
};

const addTranscript = (data) => {
  const transcript = { id: nextId.transcripts++, timestamp: now(), ...data };
  state.transcripts.push(transcript);
  return transcript;
};

const addPrescription = (data) => {
  const prescription = { id: nextId.prescriptions++, created_at: now(), status: 'pending', ...data };
  state.prescriptions.unshift(prescription);
  return prescription;
};

const addCallback = (data) => {
  const callback = { id: nextId.callbackQueue++, created_at: now(), status: 'pending', ...data };
  state.callbackQueue.unshift(callback);
  return callback;
};

const resetStore = () => {
  for (const key of Object.keys(state)) state[key] = [];
  for (const key of Object.keys(nextId)) nextId[key] = 1;
};

module.exports = {
  state,
  createCall,
  updateCall,
  addTranscript,
  addPrescription,
  addCallback,
  resetStore,
};
