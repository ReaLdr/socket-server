import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io'
import http from 'http';
import * as socket from '../sockets/socket';

export default class Server {

    private static _instance: Server;

    public app: express.Application;
    public port: number;

    public io: socketIO.Server;
    private httpServer: http.Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server(this.app);
        // this.io = socketIO(this.httpServer);
        // this.io = new socketIO.Server( this.httpServer );
        this.io = new socketIO.Server(this.httpServer, { cors: { origin: true, credentials: true } });

        this.escucharSockets();

    }

    public static get instance() {

        // Si ya existe una instancia la regrese y si es primera vez que se llama la función la crea y la regresa
        return this._instance || (this._instance = new this());

    }

    private escucharSockets() {

        console.log('Esuchando conexiones - sockets!');

        this.io.on('connection', cliente => {

            // Aquí se crearán todos los eventos

            // console.log({id_socket: cliente.id});

            // Conectar cliente
            socket.conectarCliente(cliente);
            
            // Configurar usuario
            socket.configurarUsuario( cliente, this.io );

            
            console.log('Cliente conectado');

            // Mensajes
            socket.mensaje(cliente, this.io);

            // Desconectar
            socket.desconectar( cliente );


        });

    }

    start(callback: () => void) {  // Cambia el tipo de 'callback' a '() => void'
        // this.app.listen( this.port, callback );
        this.httpServer.listen(this.port, callback)
    }

}
