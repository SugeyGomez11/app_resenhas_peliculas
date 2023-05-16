const mongoose = require('mongoose')

const Esquema = mongoose.Schema
const EsquemaPelicula = new Esquema({
    nombre: String,
    descripcion: String,
    anho_publicacion: Number,
    genero: String,
});

module.exports = mongoose.model('Pelicula', EsquemaPelicula);