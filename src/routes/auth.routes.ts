import express from 'express';
import { loginController, logoutController } from '../controllers/auth.controller';
import { mostrarUsuarios } from '../controllers/usuarios.controller';

const authRoutes = express.Router();

// Rutas de ejemplo de sesiones
authRoutes.get('/login', loginController);
authRoutes.get('/logout', logoutController);
// Ruta para mostrar la lista de usuarios
authRoutes.get('/Usuarios', mostrarUsuarios);

export default authRoutes;