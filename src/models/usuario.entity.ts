import { Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn, 
	OneToMany,
	BeforeInsert
	 } from 'typeorm';
import bcrypt from 'bcrypt';
import { Noticia } from '../models/noticia.entity';


@Entity() //decorador agregando detalles
export class Usuarios { //propiedad que va a tener 
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column({ unique: true }) //unico
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

	@OneToMany(() => Noticia, (n) => n.usuario)
	noticias: Noticia[];

	@BeforeInsert()
	async hashPassword() {
		this.pass = await bcrypt.hash(this.pass, 10);
	}
	

}