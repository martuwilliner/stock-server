/* const express = require('express');  SIN TYPE MODULE en package.json */ 
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db.js';
import usuarioRoutes from './routes/usuarioRoutes.js';
const app = express();

dotenv.config();

conectarDB();


//Routes

app.use('/api/usuarios', usuarioRoutes);




const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server corriendo en el puerto ${PORT}`);
}
);