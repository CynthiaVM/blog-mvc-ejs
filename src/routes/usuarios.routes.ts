import express from 'express';
import { mostrarFormularioRegistro, registrarUsuario } from '../controllers/usuarios.controller';

const userRoutes = express.Router();

userRoutes.get('/registro', mostrarFormularioRegistro);
userRoutes.post('/registro', registrarUsuario);

export default userRoutes;
