const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bej6whjtyse6k9y5pobd', 'ueirjtovlnsuwrwj', 'c6AVSvNbpEdFZaPir0Zf', {
    host: 'bej6whjtyse6k9y5pobd-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: 3306,  
});

sequelize.authenticate()
.then(() => console.log("Conexion a la base de datos exitosa"))
.catch(err => console.error("Error al conectar a la base de datos", err))

module.exports = sequelize;
