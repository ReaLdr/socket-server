import { Router, Request, Response } from 'express';
import Server from '../classes/server';


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

export default router;