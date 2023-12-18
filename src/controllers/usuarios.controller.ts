import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Usuarios } from '../models/usuario.entity';

export const mostrarUsuarios = async (req: Request, res: Response) => {
  try {
    const usuarioRepository = getRepository(Usuarios);
    const usuarios = await usuarioRepository.find();

    res.render('usuarios', { usuarios });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener la lista de usuarios');
  }
};

export const mostrarFormularioRegistro = (req: Request, res: Response) => {
  res.render('registro'); // Renderiza el formulario de registro
};

export const registrarUsuario = async (req: Request, res: Response) => {
  const { nombre, apellido, email, contraseña } = req.body;

  // Validaciones y verificaciones aquí

  const usuarioRepository = getRepository(Usuarios); 

  // Crea un nuevo usuario
  const nuevoUsuario = usuarioRepository.create({
    nombre,
    apellido,
    email,
    pass: contraseña, 
  });

  // Guarda el nuevo usuario en la base de datos
  await usuarioRepository.save(nuevoUsuario);

  res.redirect('/login'); // Redirige al usuario después de registrarse
};

