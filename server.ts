import express, { Request, Response } from 'express';
import 'dotenv/config';
import path from 'path';
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import authRoutes from './src/routes/auth.routes';
import expressLayouts from 'express-ejs-layouts';
import noticiaRoutes from './src/routes/noticia.routes';
const app = express();
//para recibir la info de crear
app.use(express.urlencoded({extended: true}));
app.use(express.json());

dbcontext
	.initialize()
	.then(() => {})
	.catch((err: TypeORMError) => {
		logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
	});

// configuracion de cookie y sessiones. 
//Middleware para analizar cookies: procesa la solicitud y se lleva la cookie para poder consultar
app.use(cookieParser());
app.use(
	session({
		secret: 'acatienequeirmisecreto',//contraseña
		resave: false,//en falso no guarda
		saveUninitialized: true,
		cookie: { secure: false },// Configuración de la cookie. False para q la tome en htp
	})
);

//Configurar EJS
app.set('view engine', 'ejs');
app.use(expressLayouts);
app.set('views', path.join(__dirname, 'src', 'views'));
app.set('layout', path.join(__dirname, 'src', 'views', 'shared', 'layout'));


const port = process.env.PORT || 2000;

app.use('/noticias', noticiaRoutes);
app.use('/auth', authRoutes);
app.use('/', (req: Request, res: Response) => {
	res.redirect('/noticias');
});

app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🌈​✅`);
});
