const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('b5epq1teaxjvlqjx0gfi', 'utgawtrcc73erxqf', 'WZycspBJSXuTUlGMv7c6', {
    host: 'b5epq1teaxjvlqjx0gfi-mysql.services.clever-cloud.com',
    dialect: 'mysql',
});

sequelize.authenticate()
.then(() => console.log("Conexion a la base de datos exitosa"))
.catch(err => console.error("Error al conectar a la base de datos", err))

module.exports = sequelize;
