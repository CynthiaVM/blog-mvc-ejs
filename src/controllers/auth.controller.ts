import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Usuarios } from '../models/usuario.entity';

export const mostrarFormularioRegistro = (req: Request, res: Response) => {
  res.render('registro'); // Renderiza el formulario de registro
};

export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, apellido, email, pass } = req.body;

    // Verificar si el usuario ya existe en la base de datos
    const usuarioRepository = getRepository(Usuarios);
    const usuarioExistente = await usuarioRepository.findOne({ where: { email } });

    if (usuarioExistente) {
      return res.status(400).send('El usuario ya existe');
    }

    // Crear un nuevo usuario
    const nuevoUsuario = usuarioRepository.create({
      nombre,
      apellido,
      email,
      pass, // La contraseña se hasheará en el hook BeforeInsert del modelo
    });

    // Guardar el nuevo usuario en la base de datos
    await usuarioRepository.save(nuevoUsuario);

    // Redirige al usuario después de registrarse
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error en el registro');
  }
};
  
export const loginController = (req: Request, res: Response) => {
	if (req.session) {
		//logica de login para el usuario
		req.session.user = { id: 1, username: 'Cynthia' };
		res.send('Usuario logueado correctamente!');
	}
};
export const quiensoyController = (req: Request, res: Response) => {
	if (req.session?.user) {
		const user = req.session.user;

		res.render('quiensoy', { user });
	} else {
		res.send('No estas logueado');
	}
};
export const logoutController = (req: Request, res: Response) => {
	req.session?.destroy((err) => {});
	res.send('Session cerrada correctamente');
};