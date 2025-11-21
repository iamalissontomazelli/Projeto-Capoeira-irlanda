// Importações
const express = require('express');
const cors = require('cors');
require('dotenv').config();

// Cria a aplicação Express
const app = express();

// Middlewares
app.use(cors());          // Libera acesso para o frontend
app.use(express.json());  // Permite receber JSON no body

// Rotas
const contactRoutes = require('./routes/contact.routes');
app.use('/contact', contactRoutes);

// Exporta a aplicação
module.exports = app;