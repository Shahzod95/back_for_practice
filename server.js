const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const authRoutes = require('./routes/authRoutes');
require('./config/dotenv');

const app = express();
const PORT = 4000;

app.use(cors())

// Middleware
app.use(bodyParser.json());

// Routelar
app.use('/auth', authRoutes);

// Serverni ishga tushirish
app.listen(PORT, () => {
  console.log(`Server ishga tushdi: http://localhost:${PORT}`);
});
