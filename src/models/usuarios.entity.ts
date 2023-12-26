import {
	BeforeInsert,
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import bcrypt from 'bcrypt';
import { Noticia } from './noticia.entity';

@Entity()//decorador agregando detalles
export class Usuarios {                //propiedad que va a tener 
		@PrimaryGeneratedColumn('uuid')
		id?: string; //el signo de pregunta es por que puede o no venir
	
		@Column({ unique: true })
		email: string;
	
		@Column()
		pass: string;
	
		@Column()
		nombre: string;
	
		@Column()
		apellido: string;
	
		@CreateDateColumn()
		create_at: Date;
	
		@UpdateDateColumn()
		updated_at: Date;
	
		@DeleteDateColumn()
		delete_at: Date;
	
		@OneToMany(() => Noticia, (n) => n.usuario)
		noticias: Noticia[];
	
		@BeforeInsert()
		async hashPassword() {
			this.pass = await bcrypt.hash(this.pass, 10);
		}
		@BeforeInsert()
		async toLowerCaseNormalize() {
			this.email = this.email.toLowerCase();
		}
	}