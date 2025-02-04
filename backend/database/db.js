const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bwax09kzn3yysr7oujuy', 'uoentdq6pdtqp8qu', 'tscDRYywKuq8i0dIHlFk', {
    host: 'bwax09kzn3yysr7oujuy-mysql.services.clever-cloud.com',
    dialect: 'mysql',
    port: 3306,  
});

sequelize.authenticate()
.then(() => console.log("Conexion a la base de datos exitosa"))
.catch(err => console.error("Error al conectar a la base de datos", err))

module.exports = sequelize;
