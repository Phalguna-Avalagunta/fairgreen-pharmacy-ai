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

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      {
        role: 'system',
        content: 'Classify pharmacy queries into one label: prescription_request, general_inquiry, appointment, callback. Return only the label.',
      },
      { role: 'user', content: text },
    ],
    temperature: 0,
  });

  const output = completion.choices?.[0]?.message?.content?.trim();
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

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: 'You are a concise UK pharmacy assistant helping patients.' },
      { role: 'user', content: query },
    ],
    temperature: 0.4,
  });

  return completion.choices?.[0]?.message?.content?.trim() || 'Thank you for calling Fairgreen Pharmacy. How can I help further?';
};

module.exports = { classifyQuery, generateResponse };
