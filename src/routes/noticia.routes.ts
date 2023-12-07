import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	mostrarDetalleNoticia,
} from '../controllers/noticias.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/detalle/:id', mostrarDetalleNoticia);

//crear
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);
//editar
//noticiasRoutes.get('/editar/:idNoticia', editarNoticiaView);
//noticiasRoutes.get('/editar/:idNoticia', editarNoticia);


export default noticiasRoutes;