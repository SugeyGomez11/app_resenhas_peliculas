const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const fs = require('fs');
const sesion = require('express-session');
const config = require('./config/Config');
// const jwt = require('jsonwebtoken');
const passport = require('passport');
// const passportJWT = require('passport-jwt');
// const ExtractJwt = passportJWT.ExtractJwt;
// const JwtStrategy = passportJWT.Strategy;
// const jwtOptions = {}
// jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
// jwtOptions.secretOrKey = 'llaveaplicacioncalificacionesapeliculassecreta';

const app = express();
const router = express.Router();
const serveStatic = require('serve-static');
const history = require('connect-history-api-fallback');

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(cors());

app.use(sesion({
    secret: config.SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { httpOnly: false }
}));
app.use(passport.initialize());
app.use(passport.session());

//conexion a mongodb
mongoose.connect(config.DB, function() {
    console.log('Se ha conectado satisfactoriamente a la base de datos');
})
.catch(err => {
    console.error('Error iniciando aplicación', err.stack);
    process.exit(1);
});

//Incluir controladores
fs.readdirSync("controllers").forEach(function (archivo) {
    // console.log(archivo);
    //console.log(archivo.substr(-3));
    if(archivo.substr(-3) == ".js") {
        // console.log('Llego aqui');
        const route = require("./controllers/" + archivo);
        route.controller(app);
    }
});
app.use(history());
app.use(serveStatic(__dirname + "/dist"));

router.get('/api/current_user', isLoggedIn, function(req, res) {
    if ( req.usuario ){
        res.send({ current_user: req.usuario });
    } else {
        res.status(403).send({ success: false, msg: 'No Autorizado' });
    }
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
      return next();

    res.redirect('/');
    console.log('error, autenticación fallida');
}
router.get('/api/logout', function(req, res) {
    req.logout();
    res.send();
});

router.get('/', function(req, res) {
    res.json({ mensaje: 'API Inicializada!' });
});
const puerto = process.env.API_PORT || 8081;
app.use('/',router);
var server = app.listen(puerto, function() {
    console.log(`api corriendo en el puerto ${puerto}`);
});
module.exports = server;