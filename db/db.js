const mysql = require('mysql2')

const express = require('express')
//informacion de la coneccion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuarios'
});


module.exports = { db }
