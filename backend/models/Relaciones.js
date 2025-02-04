const Pelicula = require('./Pelicula');
const Genero = require('./Genero');
const Actor = require('./Actor');
const Director = require('./Director');
const Comentario = require('./Comentario');
const comentarioXusuarioXpelicula = require('./comentarioXusuarioXpelicula');
const Usuario = require('./Usuario');
const Rol_Usuario = require('./Rol_Usuario')

//Usuario.hasMany(comentarioXusuarioXpelicula, { foreignKey: 'id_usuario', allowNull: false });
//Pelicula.hasMany(comentarioXusuarioXpelicula, { foreignKey: 'id_pelicula', allowNull: false });
//Comentario.hasMany(comentarioXusuarioXpelicula, { foreignKey: 'id_comentario', allowNull: false});

Usuario.belongsToMany(Pelicula, { through: 'peliculaXusuario', onDelete: 'CASCADE'});
Pelicula.belongsToMany(Usuario, { through: 'peliculaXusuario', onDelete: 'CASCADE'});

//Rol_Usuario.hasMany(Usuario, { foreignKey: 'id_rol', allowNull: false });
//Usuario.belongsTo(Rol_Usuario, { foreignKey: 'id_rol', allowNull: false });

Pelicula.belongsToMany(Genero, { through: 'generoXpelicula', onDelete: 'CASCADE'});
Genero.belongsToMany(Pelicula, {through: 'generoXpelicula', onDelete: 'CASCADE'});

Pelicula.belongsToMany(Actor, { through: 'actorXpelicula', onDelete: 'CASCADE'});
Actor.belongsToMany(Pelicula, {through: 'actorXpelicula', onDelete: 'CASCADE' });

Pelicula.belongsToMany(Director, { through: 'directorXpelicula', onDelete: 'CASCADE'});
Director.belongsToMany(Pelicula, {through: 'directorXpelicula', onDelete: 'CASCADE'});