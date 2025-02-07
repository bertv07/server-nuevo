const mysql = require('mysql2')

//informacion de la coneccion
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'usuarios'
});


module.exports = { db }
