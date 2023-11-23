import { Column,
	CreateDateColumn, 
	Entity, 
	PrimaryGeneratedColumn, 
	UpdateDateColumn, 
	OneToMany, 
	ManyToOne } from 'typeorm';

import { Comentario } from '../models/comentario.entity';
import { Usuarios } from '../models/usuario.entity';

@Entity() //decorador agregando detalles
export class Noticia { //propiedad que va a tener la noticia
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column() //decorador
	titulo: string;

	@Column()
	contenido: string;

	@CreateDateColumn()
	create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
    comentarios: any;
    usuario: any;

	//@OneToMany(() => Comentario, (c) => c.noticia)
	//comentarios: Comentario[];  //sino lo tengo no podria tener los comentarios 

    //@ManyToOne(() => Usuarios, (u) => u.noticias, { nullable: false })
   //usuario: Usuarios;

}