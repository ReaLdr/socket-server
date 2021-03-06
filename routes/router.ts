import { Router, Request, Response } from 'express';

const router = Router();

router.get( '/mensajes', (req: Request, res: Response) => {
    res.json({
        ok: true,
        msg: 'Todo está bien!'
    });
});


router.post( '/mensajes', (req: Request, res: Response) => {

    /* const cuerpo= req.body.cuerpo;
    const de    = req.body.de; */
    const data = req.body;

    res.json({
        ok: true,
        msg: 'POST listo!',
        data
        // cuerpo,
        // de
    });
});

router.post( '/mensajes/:id', (req: Request, res: Response) => {

    /* const cuerpo= req.body.cuerpo;
    const de    = req.body.de; */
    const id = req.params.id;

    res.json({
        ok: true,
        msg: 'POST listo!',
        id
    });
});

export default router;
