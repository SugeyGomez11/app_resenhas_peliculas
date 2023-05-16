const EsquemaPelicula = require('../models/Pelicula');
const Calificacion = require('../models/Calificacion');
const passport = require('passport');

// console.log('Entro al controlador');
module.exports.controller = (app) => {
    // enviar una prueba tonta
    app.get('/prueba_tonta', function(req, res) {
        res.send({
            nombre: 'Daniel',
        });
    });
    //Obtener todas las peliculas
    // app.get('/peliculas', passport.authenticate('jwt', { session: false }), (req, res) => {
    app.get('/peliculas', (req, res) => {
        EsquemaPelicula.find({}, 'nombre descripcion anho_publicacion genero', (error, peliculas) => { // {} = todo
            if(error) { console.log(error) }
                res.send({
                    peliculas,
                })
        });
    });

    // Obtener una pelicula
    app.get('/api/peliculas/:id', (req, res) => {
        EsquemaPelicula.findById(req.params.id, 'nombre descripcion anho_publicacion genero', (error, pelicula) => {
            if(error) { console.error(error); }
            res.send(pelicula)
        });
    });

    // calificar una pelicula
    app.post('/peliculas/calif/:id', (req, res) => {
        const calificacion = new Calificacion({
            pelicula_id: req.params.id,
            usuario_id: req.body.usuario_id,
            calificacion: req.body.Calificacion,
        });

        calificacion.save(function (error, calificacion) {
            if(error) { console.log(error); }
            res.send({
                pelicula_id: calificacion.pelicula_id,
                usuario_id: calificacion.usuario_id,
                calificacion: calificacion.calificacion,
            })
        });
    });

    //agrega una nueva pelicula
    app.post('/peliculas', (req, res) => {
        const nuevaPelicula = new EsquemaPelicula({
            nombre: req.body.nombre,
            descripcion: req.body.descripcion,
            anho_publicacion: req.body.anho_publicacion,
            genero: req.body.genero,
        });

        console.log(nuevaPelicula);
        nuevaPelicula.save((error, pelicula) => {
            if(error) {console.log(error);}
            res.send(pelicula);
        });
    });
}