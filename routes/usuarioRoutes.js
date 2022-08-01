//Routes to users
import express from 'express';
import {registrar} from './controllers/usuarioControllers.js';


const router = express.Router();
router.post('/', registrar);

export default router;