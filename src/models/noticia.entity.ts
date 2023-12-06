import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	ManyToOne,
	OneToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

import { Comentario } from '../models/comentario.entity';
import { Usuarios } from '../models/usuario.entity';

@Entity() //decorador agregando detalles
export class Noticia { //propiedad que va a tener la noticia
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column() //decorador
	titulo: string;

	@Column({ length: 1000 })
	contenido: string;

	@CreateDateColumn()
	create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
    //comentarios: any;
    //usuario: any;
	//static usuario: { id: string; };

	@OneToMany(() => Comentario, (c) => c.noticia)
	comentarios: Comentario[];  //sino lo tengo no podria tener los comentarios 

    @ManyToOne(() => Usuarios, (u) => u.noticias, { nullable: true })
    usuario: Usuarios;

}