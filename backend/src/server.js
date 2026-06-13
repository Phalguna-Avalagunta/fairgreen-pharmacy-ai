const http = require('http');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { Server } = require('socket.io');
const logger = require('./utils/logger');
const callsRoutes = require('./routes/calls');
const transcriptsRoutes = require('./routes/transcripts');
const prescriptionsRoutes = require('./routes/prescriptions');
const adminRoutes = require('./routes/admin');
const callbacksRoutes = require('./routes/callbacks');
const errorHandler = require('./middleware/errorHandler');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'fairgreen-pharmacy-ai-backend' });
});

app.use('/api/calls', callsRoutes);
app.use('/api/transcripts', transcriptsRoutes);
app.use('/api/prescriptions', prescriptionsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/callbacks', callbacksRoutes);
app.use(errorHandler);

const server = http.createServer(app);
const io = new Server(server, { cors: { origin: '*' } });

io.on('connection', () => {
  logger.info('Dashboard client connected');
});

const port = Number(process.env.PORT || 5000);

if (require.main === module) {
  server.listen(port, () => {
    logger.info(`Server listening on port ${port}`);
  });
}

module.exports = { app, server };
