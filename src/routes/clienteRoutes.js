const express = require("express");
const router = express.Router();
const { clienteController } = require("../controllers/clienteController");

// GET /clientes/
router.get('/clientes', clienteController.listarClientes);

// POST /clientes -> Criar um novo cliente
router.post('/clientes', clienteController.criarCliente);

module.exports = router; 
