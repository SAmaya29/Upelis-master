const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('upelis2.0', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
});

sequelize.authenticate()
.then(() => console.log("Conexion a la base de datos exitosa"))
.catch(err => console.error("Error al conectar a la base de datos", err))

module.exports = sequelize;
