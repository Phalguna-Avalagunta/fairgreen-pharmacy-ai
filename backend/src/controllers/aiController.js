const openai = require('../config/openai');

const categorize = (text = '') => {
  const value = text.toLowerCase();
  if (value.includes('prescription') || value.includes('medication') || value.includes('repeat')) return 'prescription_request';
  if (value.includes('appointment')) return 'appointment';
  if (value.includes('call me') || value.includes('callback') || value.includes('pharmacist')) return 'callback';
  return 'general_inquiry';
};

const classifyQuery = async (text) => {
  if (!openai) {
    return { category: categorize(text), confidence: 0.7 };
  }

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: `Classify this pharmacy call query into one of: prescription_request, general_inquiry, appointment, callback. Return only the label. Query: ${text}`,
  });

  const output = response.output_text?.trim();
  return { category: output || categorize(text), confidence: 0.9 };
};

const generateResponse = async ({ category, query }) => {
  if (!openai) {
    const canned = {
      prescription_request: 'I can help with your prescription request. Please confirm your full name and medication.',
      appointment: 'I can help with appointment-related enquiries. Please share the appointment date and concern.',
      callback: 'I will add this to our pharmacist callback queue. You will be contacted shortly.',
      general_inquiry: 'Thank you for your question. I can help with opening hours, services, and prescription status.',
    };
    return canned[category] || canned.general_inquiry;
  }

  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: `You are a pharmacy assistant. Respond clearly and briefly to this patient query: ${query}`,
  });

  return response.output_text?.trim() || 'Thank you for calling Fairgreen Pharmacy. How can I help further?';
};

module.exports = { classifyQuery, generateResponse };
