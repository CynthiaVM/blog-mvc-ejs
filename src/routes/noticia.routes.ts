import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
	crearNoticia,
	mostrarDetalleNoticia,
} from '../controllers/noticias.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/detalle/:id', mostrarDetalleNoticia);
noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/crear', crearNoticiaView);
noticiasRoutes.post('/crear', crearNoticia);

export default noticiasRoutes;