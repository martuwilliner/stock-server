import express from 'express';
import {registrar,
    autenticar,
    confirmarUsuario
} from '../controllers/usuarioController.js'; 

const router = express.Router();

//Creación, registro, autenticación y confirmación de usuarios

router.post('/', registrar); //Registrar usuario
router.post('/login', autenticar) //Autenticar usuario
router.get('/confirmar/:token', confirmarUsuario); //Confirmar usuario

export default router;