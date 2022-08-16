
const express = require('express');
const app = express();

const mongoose = require('mongoose');

const saucesRoutes = require('./routes/sauces.route');
const usersRoutes = require('./routes/users.route');
const path = require('path');

mongoose.connect('mongodb+srv://chinwe360:Kirsten2012@cluster0.aqhcnzm.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));
 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.json());

  app.use('/api/sauces', saucesRoutes);
  app.use('/api/auth', usersRoutes);

  module.exports = app;









  