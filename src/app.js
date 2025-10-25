const express = require("express");
const app = express();

const produtoRoutes = require("./routes/produtoRoutes");


app.use(express.json());


app.use(produtoRoutes);

// Inicializa o servidor
const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 