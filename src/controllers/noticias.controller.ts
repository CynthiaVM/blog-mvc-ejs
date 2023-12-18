import { Request, Response } from 'express';
import logger from '../helpers/logger';
import {
	Inoticias_create,
	Inoticias_update,
} from '../interfaces/noticias/noticias.interfaces';
import { ILike, IsNull } from 'typeorm';
import { Noticia } from '../models/noticia.entity';
import { dbcontext } from '../db/dbcontext';


export const noticiasIndex = async (req: Request, res: Response) => {
   // console.log('Llegó a noticiasIndex');
    // Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
    const noticiaRepository = dbcontext.getRepository(Noticia);

	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		take: 10,
        where: { deleted_at: IsNull() },
	});

	res.render('home/index_view_noticias', { noticias });

};

export const crearNoticiaView = (req: Request, res: Response) => {
    //console.log('Llegó a crearNoticiaView');
    res.render('noticias/crear');
};
//async
export const crearNoticia = async (req: Request, res: Response) => {
    //console.log('Llegó a crearNoticia');
    //console.log('Datos recibidos:', req.body);
    const data: Inoticias_create = req.body;

	try {
		if (!data.titulo || !data.contenido || data.titulo.trim() == '' || data.contenido.trim() == '') {
            throw new Error('El título o el contenido está vacío');
        }
		const noticiaRepository = dbcontext.getRepository(Noticia);

		const noticia = noticiaRepository.create({
			...data,
		});

		const result = await noticiaRepository.save(noticia);
		res.status(200).redirect('/noticias');
	} catch (error) {
		console.error(error);
		res.status(500).render('shared/error');
	}
};

//export const getNoticiaById = async (req: Request, res: Response) => {
	//console.log(req.params);
	//const noticiaRepository = dbcontext.getRepository(Noticia);
	//const noticia = await noticiaRepository.findOneBy({
	//	id: req.params.idNoticia,
	//});
	//res.send({ noticia });
//};
export const getNoticiaById = async (req: Request, res: Response) => {
    try {
        console.log('Params:', req.params);
        
        const noticiaRepository = dbcontext.getRepository(Noticia);
        const noticia = await noticiaRepository.findOne({
            where: { id: req.params.idNoticia },
        });

        console.log('Noticia:', noticia);

        if (!noticia) {
            console.log('Noticia no encontrada');
            res.render('shared/error');
        } else {
            console.log('Renderizando detalle:', noticia);
            res.render('noticias/detalle', { noticia });
        }
    } catch (error) {
        console.error('Error en getNoticiaById:', error);
        res.render('shared/error');
    }
};


export const editarNoticia = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.exist({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error');
		}
		const editNoticia: Inoticias_update = {
			titulo: req.body.titulo,
			contenido: req.body.contenido,
		};
		await noticiaRepository.update(req.params.idNoticia, editNoticia);
        res.redirect('/noticias/listado');

	} catch (error) {
		res.render('shared/error');
	}
};

export const editarNoticiaView = async (req: Request, res: Response) => {
	try {
		const noticiaRepository = dbcontext.getRepository(Noticia);
		const noticia = await noticiaRepository.findOne({
			where: { id: req.params.idNoticia },
		});
		if (!noticia) {
			res.render('shared/error');
		}

		res.render('noticias/editar', { noticia });
	} catch (error) {
		res.render('shared/error');
	}
};

export const listadoNoticias = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);

	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		withDeleted: true,
	});

	res.render('noticias/listado', { noticias });
};

export const borrarNoticia = async (req: Request, res: Response) => {
	const noticiaRepository = dbcontext.getRepository(Noticia);
	const noticia = await noticiaRepository.findOne({
		where: { id: req.params.idNoticia },
	});
	if (!noticia) {
		res.render('shared/error');
	}
	await noticiaRepository.softDelete(req.params.idNoticia);
	res.redirect('/noticias/listado');
};