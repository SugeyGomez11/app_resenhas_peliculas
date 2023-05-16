const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');

const Esquema = mongoose.Schema;
const EsquemaUsuario = new Esquema({
    nombre: String,
    email: String,
    password: String,
});

const Usuario = mongoose.model('Usuario', EsquemaUsuario);
module.exports = Usuario;

module.exports.crearUsuario = (nuevoUsuario, callback) => {
    bcryptjs.genSalt(10, (err, salt) => {
        bcryptjs.hash(nuevoUsuario.password, salt, (err, hash) => {
            // Almacenar la contraseña encriptada
            console.log(nuevoUsuario.password);
            console.log(hash);
            const recursoNuevoUsuario = nuevoUsuario;
            recursoNuevoUsuario.password = hash;
            recursoNuevoUsuario.save(callback);
        });
    });
};

module.exports.getUserByEmail = (email, callback) => {
    const consulta = { email };
    Usuario.findOne(consulta, callback);
};

module.exports.compararContrasenhas = (passwordCandidato, hash, callback) => {
    bcryptjs.compare(passwordCandidato, hash, (err, isMatch) => {
        if (err) console.log(err);
        callback(null, isMatch);
    });
};