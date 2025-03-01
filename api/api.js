const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Simulação de banco de dados em memória
let items = [];

// Rota GET - Retorna todos os itens
app.get("/items", (req, res) => {
    try {
        const resposta = items;
        let user;
        let statusCode;
        let message;
        let dados;

        if (resposta.length === 0) {
            user = items;
            statusCode = 200;
            message = `Nenhum usuário foi encontrado.`;
        } else {
            user = items;
            statusCode = 200;
            message = `Sucesso na busca de usuários.`;
        }

        dados = { user, message, statusCode };

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(dados)}`);
        res.json(dados);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Rota POST - Adiciona um novo item
app.post("/items", (req, res) => {
    try {
        const { name, age } = req.body;

        if (!name) {
            console.log(`[ERRO] O campo 'name' não foi preenchido.`);

            return res.status(400).json({
                message: "O campo 'name' é obrigatório.",
                statusCode: 400
            });
        }

        let verificaName = typeof (name);
        if (verificaName !== "string") {
            console.log(`[ERRO] O campo 'name' não pode ser um Number.`);

            return res.status(400).json({
                message: "O campo 'name' não pode ser um Number.",
                statusCode: 400
            });
        }

        const userExists = items.some(user => user.name === name);
        if (userExists) {
            console.log(`[ERRO] Usuário já cadastrado.`);

            return res.status(400).json({
                message: "Usuário já cadastrado.",
                statusCode: 400
            });
        }

        const user = { id: items.length + 1, name, age };
        const message = `Sucesso na criação.`;
        const statusCode = 201;

        const ret = { user, message, statusCode };

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(ret)}`);
        items.push(user);
        res.status(201).json(ret);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Rota DELETE - Remove um item pelo ID
app.delete("/items/:id", (req, res) => {
    try {
        const { id } = req.params;
        const idNum = parseInt(id);

        const itemIndex = items.findIndex(item => item.id === idNum);
        if (itemIndex === -1) {
            return res.status(404).json({ message: "Item não encontrado." });
        }

        items.splice(itemIndex, 1);
        console.log(`[SUCESSO] Item removido: ID ${idNum}`);
        res.json([{ message: `Item removido com sucesso!`, statusCode: 200 }]);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
        res.status(500).json({ message: "Erro interno do servidor." });
    }
});

// Iniciando o servidor
app.listen(port, () => {
    // console.log(`Servidor rodando em http://localhost:${port}`);
});
