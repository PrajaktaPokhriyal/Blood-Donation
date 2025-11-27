require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', require('./src/routes/auth'));
app.use('/api/donors', require('./src/routes/donor'));
app.use('/api/hospitals', require('./src/routes/hospital'));
app.use('/api/inventory', require('./src/routes/inventory'));

app.get('/', (req, res) => {
  res.send({ ok: true, msg: "Blood Donor Backend Running" });
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log("Server running on " + PORT));
  })
  .catch(err => console.error(err));
