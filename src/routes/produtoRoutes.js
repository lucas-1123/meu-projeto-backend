const express = require("express");
const router = express.Router();
const { produtoController } = require("../controllers/produtoController");

// GET /produtos/
router.get('/produtos', produtoController.listarProdutos);

// POST /produtos -> Criar um novo produto
router.post('/produtos', produtoController.criarProduto);

module.exports = router; 
