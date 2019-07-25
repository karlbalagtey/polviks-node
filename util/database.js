const Sequelize = require('sequelize');

const sequelize = new Sequelize('polviks-node', 'adminboom', 'Proverbs356', {
    dialect: 'mysql', 
    host: 'localhost'
});

module.exports = sequelize;