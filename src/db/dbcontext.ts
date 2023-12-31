import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';

export const dbcontext = new DataSource({
	type: 'mariadb',
	host:process.env.DB_HOST,
	port:Number(process.env.DB_PORT)|| 3307,
	username:process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	logging: false,
	synchronize: true,
	entities: [__dirname + '/../**/*.entity.{js,ts}'],
});

//type: 'mariadb',
//	host:process.env.DB_HOST,
//	port: 3307,
//	username:process.env.DB_USER,
//	password: process.env.DB_PASSWORD,
//	database: process.env.DB_NAME,
//	logging: true,
//	synchronize: true,
//	entities: [__dirname + '/../**/*.entity.{js,ts}'],