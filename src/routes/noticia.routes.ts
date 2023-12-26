
import express, { Router } from 'express';
import multer from 'multer';  
import {
  noticiasIndex,
  crearNoticiaView,
  crearNoticia,
  getNoticiaById,
  editarNoticiaView,
  editarNoticia,
  listadoNoticias,
  borrarNoticia,
} from '../controllers/noticias.controller';
import { authMiddleware } from '../middlewares/auth.middleware';

const noticiasRoutes = express.Router();

//diferente a Nacho
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/by/:idNoticia', getNoticiaById);

// Listado
noticiasRoutes.get('/listado', authMiddleware, listadoNoticias);
//crear
noticiasRoutes.get('/crear', authMiddleware, crearNoticiaView);
noticiasRoutes.post('/crear', upload.single('imagen'),authMiddleware, crearNoticia); // Utilizo 'upload' aca, distinto a Nacho
//editar
noticiasRoutes.get('/editar/:idNoticia', authMiddleware, editarNoticiaView);
noticiasRoutes.post('/editar/:idNoticia', authMiddleware, editarNoticia);
//delete
noticiasRoutes.get('/borrar/:idNoticia', authMiddleware, borrarNoticia);

export default noticiasRoutes;

//export default noticiasRoutes;
//export default router;