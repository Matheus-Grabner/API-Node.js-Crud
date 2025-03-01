const { Sequelize, DataTypes } = require("sequelize");

// Configuração do SQLite
const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "./database.sqlite" // Arquivo onde os dados serão armazenados
});

// Definição do modelo "Item"
const Item = sequelize.define("Item", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    telefone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nomeEmpresa: {
        type: DataTypes.STRING,
        allowNull: true
    }
});

// Sincronizar o modelo com o banco de dados (cria a tabela se não existir)
sequelize.sync();

module.exports = { Item };