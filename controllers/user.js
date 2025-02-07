const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const { request } = require('http');
const { error, Console } = require('console');
const bcrypt = require('bcryptjs')
router.get('/view', (request, response) => {
    const info = {
        id: 2,
        nombre: "Nuevo sitio"
    }
    response.render('index', info)
})

router.get('/', (request, response) => { //rutas donde puede entrar este modelo
    User.getAllUsers((error, result) => {
                if (error) {
                    console.log("Error en la consulta");
                    response.status(500).send('Error en la consulta');
                    return;
                }
                response.render('user', { users: result })
            })
});


router.post('/login', (request, response) => {
    const user = request.body;
    console.log(user)
    User.createUser(user, (error, result) => {
        if (error) {
            console.log("Error en la consulta");
            response.status(500).send('Error en la consulta');
            return;
        }
        response.send({ mensaje: "Usuario registrado"})
    })
})

router.post('/registro', (request, response) => {
    const {nombre, apellido} = request.body;

    bcrypt.hash(apellido, 10, (error, hash) => {
        if (error) {
            console.log("Error en la consulta");
            response.status(500).send('Error en cifrar apellido');
            return;
        }
        User.registerUser(nombre, hash, (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                response.status(500).send('Error en la consulta');
                return;
            }
            response.send({ mensaje: "Usuario registrado"})
        })
    })
})

module.exports = router