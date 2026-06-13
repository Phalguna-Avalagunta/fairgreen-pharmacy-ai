const express = require('express');
const { state } = require('../utils/store');

const router = express.Router();

router.get('/', (req, res) => res.json(state.callbackQueue));

module.exports = router;
