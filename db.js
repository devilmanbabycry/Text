const {Sequelize} = require('sequelize');

module.exports = new Sequelize(
    'text',
    'postgres',
    'root',
    {
        host: 'localhost',
        port: '5432',
        dialect: 'postgres',
        logging: false
    }
)