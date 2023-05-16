// var peliculas = require('../../../../controllers/peliculas');
// let chaiHttp = require('chai-http');
// let chai = require('chai');
// var expect = chai.expect;
// var should = chai.should();
// var express = require('express');
// let server = require('../../../../server');
// var app = express();
// chai.use(chaiHttp);

const controller = require('./../../../../controllers/peliculas');
const Pelicula = require('./../../../../models/Pelicula');
let server = require('./../../../../server');
let chai = require('chai');
let sinon = require('sinon');
const expect = chai.expect;
let chaiHttp = require('chai-http');
chai.use(chaiHttp);
const should = chai.should();

// function buildResponse() {
//     return http_mocks.createResponse({eventEmitter: require('events').EventEmitter});
// }



describe('controllers.peliculas', function() {
    it('exists', function() {
        expect(controller).to.exist;
    });
    describe('/GET peliculas', () => {
        it('debería enviar todas las peliculas', (done) => {
            var pelicula1 = {
                nombre: 'test1',
                descripcion: 'test1',
                anho_publicacion: 2017,
                genero: 'test1'
            };
            var pelicula2 = {
                nombre: 'test2',
                descripcion: 'test2',
                anho_publicacion: 2018,
                genero: 'test2'
            };
            var expectedMovies = [pelicula1, pelicula2];
            sinon.mock(Pelicula)
            .expects('find')
            .yields('', expectedMovies);
            chai.request(server)
            .get('/peliculas')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                expect(res.body).to.eql({
                    expectedMovies,
                });
                done();
            });
        })
    })
});

// describe('/GET prueba_tonta', () => {
//     it('debería responder con un nombre de objeto', (done) => {
//         chai.request(server)
//         .get('/prueba_tonta')
//         .end((err, res) => {
//                 res.should.have.status(200);
//                 res.body.should.be.an('object');
//             done();
//         });
//     })
// });