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
import { Comentario } from './comentario.entity';
import { Usuarios } from './usuarios.entity';

@Entity() //decorador agregando detalles
export class Noticia { //propiedad que va a tener la noticia
	@PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
	id?: string; //el signo de pregunta es por que puede o no venir

	@Column() //decorador
	titulo: string;

	@Column({ length: 1000 })
	contenido: string;

	@Column({ nullable: true })
    imagen: string; // se puede usar un tipo específico dependiendo como almacenar las imágenes

	@CreateDateColumn()
	create_at: Date;

    @UpdateDateColumn()
    update_at: Date;
    //comentarios: any;
    //usuario: any;
	//static usuario: { id: string; };

	@DeleteDateColumn()
	deleted_at: Date;

	@OneToMany(() => Comentario, (c) => c.noticia)
	comentarios: Comentario[];  //sino lo tengo no podria tener los comentarios 

    @ManyToOne(() => Usuarios, (u) => u.noticias, { nullable: true })
    usuario: Usuarios;

}

export { Usuarios };
