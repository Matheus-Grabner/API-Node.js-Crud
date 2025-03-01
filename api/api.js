const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

// Simulação de banco de dados em memória
let items = [];

// Rota GET - Retorna todos os itens
app.get("/items", (req, res) => {
    try {
        const reposta = items;
        let user;
        let statusCode;
        let massage;
        let dados;

        if (reposta == null || reposta == "" || reposta == '' || reposta == []) {
            user = items;
            statusCode = 200;
            massage = `Nenhum usuário foi encontrado.`;

            dados = {
                user,
                massage,
                statusCode
            };

        } else {
            user = items;
            statusCode = 200;
            massage = `Sucesso na busca de usuários.`;

            dados = {
                user,
                massage,
                statusCode
            }
        }

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(dados)}`);
        res.json(dados);
    } catch (e) {
        console.log(`[ERRO] Retorno: ${e}`);
    }
});

// Rota POST - Adiciona um novo item
app.post("/items", (req, res) => {
    try {
        const { name } = req.body;

        if (!name) {
            console.log(`[ERRO] O campo 'name' não foi preenchido.`);

            return res.status(400).json([{
                message: "O campo 'name' é obrigatório.",
                statusCode: 400
            }]);
        }

        const userExists = items.some(user => user.name === name);
        if (userExists) {
            console.log(`[ERRO] Usuário já cadastrado.`);

            return res.status(400).json({
                message: "Usuário já cadastrado.",
                statusCode: 400
            });
        }

        const user = { id: items.length + 1, name };
        const massage = `Sucesso na criação.`;
        const statusCode = 201;

        const ret = [
            {
                user,
                massage,
                statusCode
            }
        ];

        console.log(`[SUCESSO] Retorno da API: ${JSON.stringify(ret)}`);
        items.push(user);
        res.status(201).json(ret);
    } catch (e) {
        res.status(400).json('erro');
        console.log(`[ERRO] Retorno: ${e}`);
    }
});

// Rota DELETE - Remove um item pelo ID
app.delete("/items/:id", (req, res) => {
    const { id } = req.params;

    const user = { id: items.length + 1, name };
    const massage = `Sucesso na criação.`;
    const statusCode = 201;

    items = items.filter(item => item.id !== parseInt(id));
    res.json({ message: "Item removido com sucesso!" });
});

app.listen(port, () => {
    // console.log(`Servidor rodando em http://localhost:${port}`);
});
