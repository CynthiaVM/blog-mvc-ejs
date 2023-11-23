
import 'dotenv/config';
import express from 'express';
import path from 'path';
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';
import noticiaRoutes from './src/routes/noticia.routes';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import { loginView } from './src/controllers/loginController';
import loginRoutes from './src/routes/login.routes';
import helmet from 'helmet'

const app = express();
const port = process.env.PORT || 2000;
app.use(express.urlencoded({ extended: false }));
app.use(
	helmet({
		contentSecurityPolicy: false,
	})
);
dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
	});

// Middleware para analizar cookies: procesa la solicitud y se lleva la cookie para poder consultar
app.use(cookieParser()); 

// Middleware para gestionar sesiones
app.use(
	session({
		secret: 'my-secret-key', //contraseña
		resave: false, //en falso no guarda
		saveUninitialized: true,
		cookie: { secure: false }, // Configuración de la cookie. False para q la tome en htp
	})
);

//Configurar EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

app.use('/noticias', noticiaRoutes);

// Ruta de inicio de sesión
app.get('/Session', (req, res) => {
	if (req.session) {
		//Logica de login para usuario
		req.session.user = { id: 1, username: 'Cintia' };
	}

	res.send('Inicio de sesión exitoso.');
});
//Me muestra quien ingreso 
app.get('/QuienSoy', (req, res) => {
	if (req.session?.user) {
		res.send(req.session.user);
		}
		else{
			res.send('No estas logueado');
		}
	});
app.get('/Logout', (req, res) => {
		req.session?.destroy((err)=> {
			console.log(err);
		}); 
		res.send('Session cerrada correctamente');
	});


app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🌈​✅`);
});
