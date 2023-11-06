import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
//import "reflect-metadata";
import { dbcontext } from './src/db/dbcontext';
import { TypeORMError } from 'typeorm';
import logger from './src/helpers/logger';


dotenv.config();
const app = express();


dbcontext
.initialize()
.then(() => {})
.catch((err: TypeORMError) => {
	logger.error(`Error al iniciar la base de datos: ${err.message}`); // si hay error
});

//Configurar EJS

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

const port = process.env.PORT || 2000;

app.get('/', (req, res) => {
	res.redirect('/ejs');
});

app.get('/ejs', (req, res) => {
	const nombre = 'Cintia 👌';
	res.render('home/index', { nombre });
});

app.listen(port, () => {
	console.log(`Servidor Express funcionando en http://localhost:${port} 🌈​✅`);
});