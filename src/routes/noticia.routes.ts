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

const noticiasRoutes = express.Router();

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
noticiasRoutes.get('/listado', listadoNoticias);
//crear
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', upload.single('imagen'), crearNoticia); // Utilizo 'upload' aca
//editar
noticiasRoutes.get('/editar/:idNoticia', editarNoticiaView);
noticiasRoutes.get('/editar/:idNoticia', editarNoticia);
//delete
noticiasRoutes.get('/borrar/:idNoticia', borrarNoticia);

export default noticiasRoutes;

//export default noticiasRoutes;
//export default router;