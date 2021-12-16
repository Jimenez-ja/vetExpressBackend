const express = require('express');
const cors = require('cors');

const dbConnection = require('../database/config');

class Server {

    constructor() {
        this.app = express();

        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            payments: '/api/payment',
            pet: '/api/pet',
            review: '/api/review',
            service: '/api/service',
            user: '/api/user',
        }

        //conexion a la base de datos
        this.cnnDB();

        //middlewares
        this.middlewares();

        //rutas de la app
        this.routes();

    }

    //conectar bd
    async cnnDB() {
        await dbConnection();
    }

    //middlewares
    middlewares() {
        this.app.use(cors());

        this.app.use(express.json());

        this.app.use(express.static('public/'));

    }

    //rutas
    routes() {
        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.payments, require('../routes/payments'));
        this.app.use(this.paths.pet, require('../routes/pet'));
        this.app.use(this.paths.review, require('../routes/review'));
        this.app.use(this.paths.service, require('../routes/service'));
        this.app.use(this.paths.user, require('../routes/user'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;