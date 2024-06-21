import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { Socket } from 'socket.io';
import { usuariosConectados } from '../sockets/socket';


const router = Router();
// export const router = Router();


router.get('/mensajes', (req: Request, res: Response) => {

    res.json({
        ok: true,
        msg: 'Todo esta bien!'
    });

});

router.post('/mensajes', (req: Request, res: Response) => {

    const { cuerpo, de } = req.body;

    const server = Server.instance;

    const payload = req.body;

    server.io.emit('mensaje-nuevo', payload);
    

    res.json({
        ok: true,
        msg: 'Todo esta bien POST!',
        cuerpo, de
    });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { cuerpo, de } = req.body;

    // Declarar instancia de nuestro server
    const server = Server.instance;
    // Es un singletone es la misma instancia

    const payload = {
        de,
        cuerpo
    };
    server.io.in( id ).emit('mensaje-privado', payload);

    res.json({
        ok: true,
        msg: 'Todo esta bien POST!',
        cuerpo,
        de,
        id
    });

});

// Servicio para obtener todos los IDs de los usuarios
router.get("/usuarios", (req: Request, res: Response) => {
    const server = Server.instance;

    return server.io.fetchSockets().then((clientesRes) => {
        const clientes = clientesRes.map((m) => m.id);

        res.send({
            ok: true,
            clientes
        });
        
    }).catch((err) => {
        console.log(err);
        res.status(500).send({
            ok: false,
            err
        })
    });
});


// Obtener usuarios y sus nombres
router.get("/usuarios/detalle", (req: Request, res: Response) => {

    res.send({
        ok: true,
        clientes: usuariosConectados.getLista()
    });

});

export default router;