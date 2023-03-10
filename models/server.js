const express = require('express')
const cors = require('cors')

class Server {

    cosntructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.middlewares();
        this.routes();
    }

    middlewares() {

        this.app.use(cors())

        this.app.use( express.json() )

        this.app.use(express.static('public'))
    }

    routes() {
        this.app.use(this.usuariosPath,require('../routes/user'))

    }

    listens() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto ', this.port)
        })
    }


}



module.exports = Server