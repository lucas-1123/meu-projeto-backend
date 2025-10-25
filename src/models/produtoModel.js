// importar a conexão com o banco de dados e o tipos de dados SQL
const { sql, getConnection } = require("../config/db");

const produtoModel = {

    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            let querySLQ = "SELECT * FROM Produtos";

            const result = await pool.request().query(querySLQ);

            return result.recordset;

        } catch (error) {

            console.error("erro ao buscar produtos:", error);
            throw error;

        }
    },

    buscarUm: async (idProduto) => {
        try {

            const pool = await getConnection();

            const querySLQ = 'SELECT * FROM produtos WHWRE idProduto = @idProduto';
            
            const result = await pool.request()
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .query(querySLQ);

            return result.recordset;
        } catch (error) {
            console.error('erro ao buscar porduto:', error);
            throw error;
        }
        
    },


    inserirProduto: async (nomeProduto, precoProduto)=>{
        try {

            const pool = await getConnection();
            
            let querySLQ = 'INSERT INTO Produtos (nomeProduto, PrecoProduto) VALUES (@nomeProduto, @precoProduto)';

            await pool.request()
                 .input('nomeProduto', sql.VarChar(100), nomeProduto) 
                 .input('precoProduto', sql.Decimal(10,2), precoProduto)
                 .query(querySLQ);
                
        } catch (error) {
            console.error('Erro ao Inserir Produto', erro);
            throw error;
            
        }
    },

    autualizarPoduto: async (req, res) => {
        try {
            const {idProduto} = req.params;
            const {nomeProduto, precoProduto } = req.body;

            // validacao de UUID
            if (idProduto.length != 36) {
                return res.status(400).json({erro: 'id do produto invalidado!'});
            }

            const produto = await produtoModel.buscarUm(idProduto);

            if (!produto || produto.length !==1) {
                return res.status(400).json({erro: 'produto nao encontrado!'});
            }

            const produtoAtual = produto[0];

            const nomeAutualizado = nomeProduto ?? produtoAtual.nomeProduto;
            const precoAtualizado = precoProduto ?? predutoAtual.precoProduto;

            await produtoModel.autualizarPoduto(idProduto, nomeAutualizado, precoAtualizado);

            res.status(200).json({message: " produto atualizado com sucesso!"});



        } catch (error) {
            console.error('erro ao atualizar produto:')
        }
    },

    autualizarPoduto: async (idProduto, nomeProduto, precoProduto) => {
    try {
        const pool = await getConnection();

        // EVITAR SQL INJECTION
        const querySLQ = `
            UPDATE produtos
            SET nomeProduto = @nomeProduto,
                precoProduto = @precoProduto
            WHERE  idProduto = @idProduto
        `

        await pool.request()
            .input('nomeProduto', sql.VarChar(100), nomeProduto)
            .input('precoProduto, sql.Decimal(10, 2),precoPeoduto')
            .input('idProduto', sql.UniqueIdentifier, idProduto)
            .query(querySLQ);
    } catch (error) {
        console.error('erro ao altualizar porduto:', error)
    }
}


};


module.exports = { produtoModel };
/////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////

// importar a conexão com o banco de dados e o tipos de dados SQL
const { sql, getConnection } = require("../config/db");

const clienteModel = {

    buscarTodos: async () => {
        try {

            const pool = await getConnection();

            let querySLQ = "SELECT * FROM Produtos";

            const result = await pool.request().query(querySLQ);

            return result.recordset;

        } catch (error) {

            console.error("erro ao buscar clientes:", error);
            throw error;

        }
    },

    inserirCliente: async (idCliente, nomeCliente, cpfCliente)=>{
        try {

            const pool = await getConnection();
            
            let querySLQ = 'INSERT INTO Clientes (idCliente, nomeCliente, cpfCliente) VALUES (@idCliente, @nomeCliente, @cpfCliente)';

            await pool.request()
                 .input('idCliente', sql.Int, idCliente)
                 .input('nomeCliente', sql.VarChar(100), nomeCliente) 
                 .input('cpfCliente', sql.VarChar(50), cpfCliente)
                 .query(querySLQ);
                
        } catch (error) {
            console.error('Erro ao Inserir Cliente', erro);
            throw error;
            
        }
    }
};

module.exports = { clienteModel};