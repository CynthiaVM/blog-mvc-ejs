import express from 'express';
import { 
  listadoUsuarios,
  crearUsuarioView,
  crearUsuario,
  editarUsuario,
  editarUsuarioView,
  eliminarUsuario,
  recuperarUsuario,
} from '../controllers/usuarios.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const usuariosRoutes = express.Router();

usuariosRoutes.get('/listado', authMiddleware, listadoUsuarios);
//usuariosRoutes.get('/registro', mostrarFormularioRegistro);
//usuariosRoutes.post('/registro', registrarUsuario);
usuariosRoutes.get('/crear', authMiddleware, crearUsuarioView);
usuariosRoutes.post('/crear', authMiddleware, crearUsuario);
usuariosRoutes.get('/editar/:idUsuario', authMiddleware, editarUsuarioView);
usuariosRoutes.post('/editar/:idUsuario', authMiddleware, editarUsuario);
usuariosRoutes.get('/eliminar/:idUsuario', authMiddleware, eliminarUsuario);
usuariosRoutes.get('/recuperar/:idUsuario', authMiddleware, recuperarUsuario);

export default usuariosRoutes;
