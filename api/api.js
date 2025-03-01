const express = require("express");
const { Item } = require("./database"); // Importa o modelo Item
const app = express();
const port = 3000;

app.use(express.json());

// Rota GET - Retorna todos os itens
app.get("/items", async (req, res) => {
    try {
        const items = await Item.findAll(); // Busca todos os itens no banco de dados

        let statusCode;
        let message;

        if (items.length === 0) {
            statusCode = 200;
            message = `Nenhum usuário foi encontrado.`;
        } else {
            statusCode = 200;
            message = `Sucesso na busca de usuários.`;
        }

        const dados = { user: items, message, statusCode };

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(dados)}`);
        res.json(dados);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Rota POST - Adiciona um novo item
app.post("/items", async (req, res) => {
    try {
        const { name, telefone, email, nomeEmpresa } = req.body;

        if (!name) {
            console.log(`[ERRO] O campo 'name' não foi preenchido.`);
            return res.status(400).json({
                message: "O campo 'name' é obrigatório.",
                statusCode: 400
            });
        }

        if (typeof name !== "string") {
            console.log(`[ERRO] O campo 'name' não pode ser um Number.`);
            return res.status(400).json({
                message: "O campo 'name' não pode ser um Number.",
                statusCode: 400
            });
        }

        const userExists = await Item.findOne({ where: { name } }); // Verifica se o usuário já existe
        if (userExists) {
            console.log(`[ERRO] Usuário já cadastrado.`);
            return res.status(400).json({
                message: "Usuário já cadastrado.",
                statusCode: 400
            });
        }


        const user = await Item.create({ name, telefone, email, nomeEmpresa }); // Cria um novo item no banco de dados
        const message = `Sucesso na criação.`;
        const statusCode = 201;

        const ret = { user, message, statusCode };

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(ret)}`);
        res.status(201).json(ret);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Rota DELETE - Remove um item pelo ID
app.delete("/items/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);

        const item = await Item.findByPk(idNum); // Busca o item pelo ID
        if (!item) {
            return res.status(404).json({ message: "Item não encontrado." });
        }

        await item.destroy(); // Remove o item do banco de dados
        console.log(`[SUCESSO] Item removido: ID ${idNum}`);
        res.json([{ message: `Item removido com sucesso!`, statusCode: 200 }]);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});