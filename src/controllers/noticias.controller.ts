import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Inoticias_create } from '../interfaces/noticias/noticias.interfaces';
import { IsNull } from 'typeorm';
import { Noticia } from '../models/noticia.entity';


export const noticiasIndex = (req: Request, res: Response) => {
	// Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
	const nombre = 'Cynthia';
	res.render('home/index', { nombre });
};

export const crearNoticiaView = (req: Request, res: Response) => {
	res.render('noticias/crear');
};
//async
export const crearNoticia =  (req: Request, res: Response) => {
	const data: Inoticias_create = req.body;

	if (data.titulo_noticia.trim() === '' || data.desc_noticia.trim() === '') {
		res.render('shared/error');
	}
	
    //try {
       // const noticia = new Noticia();
       // noticia.titulo = data.titulo_noticia;
//noticia.contenido = data.desc_noticia;

        // Añadir logs para depurar
        //console.log('Noticia a guardar:', noticia);

        // Asignar un usuario a la noticia
        //const usuarioId = 'id_del_usuario';
        //noticia.usuario = { id: usuarioId };

        // Guardar la noticia en la base de datos
        //await getRepository(Noticia).save(noticia);

        // Añadir logs para depurar
        //console.log('Noticia guardada correctamente');

		console.log(data);
		res.redirect('/noticias');
	//}
	//catch (error) {
        //console.error(error);
        //res.status(500).send('Error al crear la noticia.');
    //}
};
