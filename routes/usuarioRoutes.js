import express from 'express';
import {registrar,
    autenticar,
    confirmarUsuario,
    olvideMiPassword,
    comprobarToken,
    nuevoPassword
} from '../controllers/usuarioController.js'; 

import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

//Creación, registro, autenticación y confirmación de usuarios

router.post('/', registrar); //Registrar usuario
router.post('/login', autenticar) //Autenticar usuario
router.get('/confirmar/:token', confirmarUsuario); //Confirmar usuario
router.post('/olvide-mi-password', olvideMiPassword); //Olvidé mi password
router.get('/olvide-mi-password/:token', comprobarToken);
router.post('/olvide-mi-password/:token', nuevoPassword); //Nuevo password

export default router;