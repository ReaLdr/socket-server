import { Router, Request, Response } from 'express';


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

    res.json({
        ok: true,
        msg: 'Todo esta bien POST!',
        cuerpo, de
    });

});


router.post('/mensajes/:id', (req: Request, res: Response) => {

    const { id } = req.params;
    const { cuerpo, de } = req.body;

    res.json({
        ok: true,
        msg: 'Todo esta bien POST!',
        cuerpo,
        de,
        id
    });

});

export default router;