import express from 'express';
import {
	noticiasIndex,
	crearNoticiaView,
} from '../controllers/noticias.controller';

const noticiasRoutes = express.Router();

noticiasRoutes.get('/', noticiasIndex);
noticiasRoutes.get('/crear', crearNoticiaView);

export default noticiasRoutes;