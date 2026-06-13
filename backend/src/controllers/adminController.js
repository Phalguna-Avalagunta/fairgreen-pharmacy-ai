const { state } = require('../utils/store');

const dashboard = (req, res) => {
  const categories = state.calls.reduce((acc, call) => {
    const category = call.category || 'uncategorized';
    acc[category] = (acc[category] || 0) + 1;
    return acc;
  }, {});

  return res.json({
    totals: {
      calls: state.calls.length,
      prescriptions: state.prescriptions.length,
      callbacks: state.callbackQueue.length,
      transcripts: state.transcripts.length,
    },
    categories,
    recentCalls: state.calls.slice(0, 10),
  });
};

module.exports = { dashboard };
