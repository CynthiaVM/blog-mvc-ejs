import { Request, Response } from 'express';
import logger from '../helpers/logger';
import { Inoticias_create } from '../interfaces/noticias/noticias.interfaces';
import { ILike, IsNull } from 'typeorm';
import { Noticia } from '../models/noticia.entity';
import { dbcontext } from '../db/dbcontext';


export const noticiasIndex = async (req: Request, res: Response) => {
    console.log('Llegó a noticiasIndex');
    // Aca devolver todas las noticias ordenadas por fecha
	// ver documentacion de typeorm
    const noticiaRepository = dbcontext.getRepository(Noticia);

	const noticias = await noticiaRepository.find({
		order: { create_at: 'DESC' },
		take: 10,
	});

	res.render('home/index_view_noticias', { noticias });

};

export const crearNoticiaView = (req: Request, res: Response) => {
    console.log('Llegó a crearNoticiaView');
    res.render('noticias/crear');
};
//async
export const crearNoticia = async (req: Request, res: Response) => {
    console.log('Llegó a crearNoticia');
    console.log('Datos recibidos:', req.body);
    const data: Inoticias_create = req.body;

	try {
		if (!data.titulo || !data.contenido || data.titulo.trim() === '' || data.contenido.trim() === '') {
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

//export const cargarNoticias = async (req: Request, res: Response) => {
    //try {
       // const titulo = req.query.titulo_noticia?.toString();
       // const contenido = req.query.desc_noticia?.toString();
       // const idNoticia = req.query.id?.toString();
       // const noticiaRepository = await dbcontext.getRepository(Noticia);
    
       // const noticia = await noticiaRepository.find({
       //     order: {
         //       create_at: 'DESC',
         //       },
        //        take: 10,
          //  });
       
         //   res.render('home/index_view_noticias', { noticia, total: noticia.length});
     //} catch (error) {
    //        console.log(error);
     //   }
    //};
    
    export const obtenerNoticiaPorId = async (id: string) => {
        const noticiaRepository = await dbcontext.getRepository(Noticia);
        const noticia = await noticiaRepository.findOne({ where: { id } });
        return noticia;
        //where: { id } le dice a TypeORM que busque una noticia donde el campo id coincida con el valor proporcionado.
    };

    export const mostrarDetalleNoticia = async (req: Request, res: Response) => {
        // Lógica para obtener la noticia individual según el ID y enviarla a la vista
        const idNoticia = req.params.id;
        const noticia = await obtenerNoticiaPorId(idNoticia);
        res.render('noticias/detalle', { noticia });
    };       
   

