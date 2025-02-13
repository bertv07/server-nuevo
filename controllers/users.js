const express = require('express');
const router = express.Router();
const { User } = require('../models/users');
const { request } = require('http');
const { error, Console } = require('console');

router.get('/view', (request, response) => {
    const info = {
        id: 1,
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

router.get('/:id', (request, response) => {
    User.getUserById(request.params.id, (error, result) => {
        if (error) {
            console.log("Error en la consulta");
            response.status(500).send('Error en la consulta');
            return;
        }
        response.render('user', { users: result })

    })
})

router.post('/', (request, response) => {
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

router.put('/', (request, response) => {
    const user = request.body;
    console.log(user)
    User.updateUser(user, (error, result) => {
        if (error) {
            console.log("Error en la consulta");
            response.status(500).send('Error en la consulta');
            return;
        }
        response.send({ mensaje: "Usuario actualizado"})
    })
})

router.delete('/:id', (request, response) => {
    User.DeleteUser(request.params.id, (error, result) => {
        if (error) {
            console.log("error en la consulta");
            response.status(500).send('Error en la consulta');
            return;
        }
        response.send({mensaje: "El usuario ha sido eliminado "})
    })
})
    
module.exports = router