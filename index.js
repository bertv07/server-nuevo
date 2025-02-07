
const mysql = require('mysql2');
const express = require('express');
const { db } = require('./db/db')
const app = express();
const port = 3000;
const path = require('path')
const bodyParser = require('body-parser')
const userController = require('./controllers/users')
const userControllerAuth = require('./controllers/user')

app.use(
    express.static(
        path.join(__dirname, 'public')
    )
)
app.set('view engine', 'ejs')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (request,response) => {
    response.send('holaaa')
});

// app.get('/data', (request, responde) => {
//     const consulta = 'SELECT * FROM user';

//     db.query(consulta , (error, result) => {
//         if (error) {
//             console.error('error en la consulta', error);
//             response.status(500).send('Error en la consulta')
//             return;
//         }
//         response.json(result);
//     })
// })

app.use('/user', userController)
app.use('/auth', userControllerAuth)

db.connect(function(error) {
    if (error) {
        console.error('error en la base de datos', error);
        return
    }
    console.log('conectado a la base de datos');
    app.listen(3000, () => {
        console.log(`Servidor corriendo en: http://localhost:${port}`);
    })
})




