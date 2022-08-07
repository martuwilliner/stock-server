import express from 'express';
import {registrar
} from '../controllers/usuarioController.js'; 

const router = express.Router();

//Creación, registro, autenticación y confirmación de usuarios

router.post('/', registrar); //Registrar usuario

export default router;