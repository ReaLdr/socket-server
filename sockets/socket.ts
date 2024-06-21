import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../classes/usuario-lista';
import { Usuario } from '../classes/usuario';

// Exportar nueva instrancia de usuariosList
export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket) => {

    // Crear nueva instancia de usuario
    const usuario = new Usuario( cliente.id );
    usuariosConectados.agregar(usuario);

}

export const desconectar = ( cliente: Socket,  ) => {

    cliente.on('disconnect', () => {
        console.log('Cliente desconectado');

        usuariosConectados.borrarUsuario(cliente.id);

    })

}

// Escuchar mensajes
export const mensaje = (cliente : Socket, io: socketIO.Server) => {

    cliente.on('mensaje', (payload: { de: string, cuerpo: string }, callback) => {
        console.log('Mensaje recibido: ', payload);

        io.emit('mensaje-nuevo', payload );
        
    });

}

// Configurar usuario
export const configurarUsuario = (cliente: Socket, io: socketIO.Server) => {

    cliente.on('configurar-usuario', (payload: { nombre: string }, callback) => {
        
        // console.log('Configurando Usuario: ', payload.nombre);
        
        usuariosConectados.actualizarNombre(cliente.id, payload.nombre);

        callback(
            {
                ok: true,
                msg: `Usuario ${payload.nombre} configurado`
            }
        );
    });

}