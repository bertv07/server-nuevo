const { response } = require('express');
const { db } = require('../db/db'); //traer bd
const { callbackify } = require('util');

const User = {
    getAllUsers: function(callback){ 
        const consulta = "SELECT * FROM user";//traer datos de la bd
        return db.query(consulta, callback)
    },
    getUserById: function(id){
        const consulta = `SELECT * FROM user WHERE id = ${id}`;//traer un dato especifico de la bd 
        return db.query(consulta, callback)
    },
    getUserByUserName: function(username){
        const consulta = `SELECT * FROM user WHERE id = '${nombre}'`;//traer nombre
        return db.query(consulta, (error, result) => {
            if (error) {
                console.log("Error en la consulta");
                response.status(500).send('Error en la consulta');
                return;
            }
            return result;
        });
    }, 
    createUser: function(user, callback ){
        const consulta = `INSERT INTO user 
        (nombre, apellido, correo) VALUES 
        ('${user.nombre}',
         '${user.apellido}',
          '${user.correo}')`;//CREAR
        return db.query(consulta, callback)
    },
    deleteUser: function(id, callback ){
        const consulta = `DELETE from user WHERE id = ${id}`;//ELIMINAR
        return db.query(consulta,callback)
    },
    updateUser: function(id, user, callback){
        const consulta = `UPDATE user SET 
        nombre = '${user.nombre}', 
        apellido = '${user.apellido}', 
        correo = '${user.correo}' 
        WHERE id = ${id}`;//ACTUALIZAR
        return db.query(consulta, callback)
    },
    registerUser: function(nombre, hash, callback ){
        const consulta = `INSERT INTO user 
        (nombre, apellido, correo) VALUES 
        ('${user.nombre}', 
        '${user.apellido}', 
        '${user.correo}')`;//CREAR
        return db.query(consulta, callback)
    },
}

module.exports = { User }