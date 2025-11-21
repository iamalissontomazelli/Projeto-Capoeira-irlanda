const express = require('express');
const router = express.Router();

// Importa o controller
const contactController = require('../controllers/contact.controller');

// Rota POST para receber as mensagens do formulário
router.post('/', contactController.sendMessage);

module.exports = router;