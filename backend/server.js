const express = require('express');
const app = express();
const db = require('./models');
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const messageRoutes = require('./routes/message')

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api/auth', userRoutes);
app.use('/api/message', messageRoutes);



db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on : http://localhost:${PORT}`)
  })
})