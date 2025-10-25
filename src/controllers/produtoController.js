const { produtoModel } = require("../models/produtoModel");

const produtoController = {
    /*
    -------------------------------
     LISTAR TODOS OS PRODUTOS
     GET /produtos
    -------------------------------
     */
    listarProdutos: async (req, res)=>{
        try {
            
            const produtos = await produtoModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {
            console.error("erro ao listar produtos", error);
            res.status(500).json({error:'Erro ao buscar produtos.'});
        }
    },

     /*
    -------------------------------
    CRIAR UM NOVO PRODUTO
    POST /produtos
    BODY;
    {
        "NomeProduto": "nome",
        "precoProduto: 0.00"
    }
    -------------------------------
     */
    criarProduto: async (req, res)=>{
        try {
            const {nomeProduto, precoProduto} = req.body;

            if (nomeProduto == undefined || precoProduto ==
             undefined || isNaN(precoProduto) ){
                return res.status(400).json ({erro: 'Campos Obrigatorios não preenchidos!'});
            }

            await produtoModel.inserirProduto(nomeProduto,precoProduto);
            res.status(201).status({menssage: 'Produto Cadastrado Com Sucesso!'});
        } catch (error) {
            console.error('Erro ao Cadastrar Produto:',error);
            res.status(500).json({Erro: 'Erro ao Cadastrar Produto.'});
        }
    }
}

module.exports = {produtoController};


////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////

const { clienteModel } = require("../models/clienteModel");

const clienteController = {
    /*
    -------------------------------
     LISTAR TODOS OS clientes
     GET /clientes
    -------------------------------
     */
    listarClientes: async (req, res)=>{
        try {
            
            const Clientes = await clienteModel.buscarTodos();

            res.status(200).json(produtos);

        } catch (error) {
            console.error("erro ao listar clientes", error);
            res.status(500).json({error:'Erro ao buscar clientes.'});
        }
    },

     /*
    -------------------------------
    CRIAR UM NOVO cliente
    POST /produtos
    BODY;
    {
        "idCliente": "id"
        "NomeCliente": "nome",
        "cpfCliente: "0.00"
    }
    -------------------------------
     */
    criarCliente: async (req, res)=>{
        try {
            const {idCliente, nomeCliente, cpfCliente} = req.body;

            if (idCliente== undefined ||nomeCliente == undefined || cpfCliente ==
             undefined || isNaN(cpfCliente) ){
                return res.status(400).json ({erro: 'Campos Obrigatorios não preenchidos!'});
            }

            await clienteModel.inserirCliente(idCliente, nomeCliente, cpfCliente);
            res.status(201).status({menssage: 'Cliente Cadastrado Com Sucesso!'});
        } catch (error) {
            console.error('Erro ao Cadastrar Cliente:',error);
            res.status(500).json({Erro: 'Erro ao Cadastrar Cliente.'});
        }
    }
}

module.exports = {clienteController};
