import { 
    Column,
    CreateDateColumn, 
    Entity,
    ManyToOne, 
    PrimaryGeneratedColumn} from 'typeorm';
    import { Noticia } from '../models/noticia.entity';
    
    @Entity() //decorador agregando detalles
    export class Comentario { //propiedad que va a tener el comentario
        @PrimaryGeneratedColumn('uuid') //dice que sera una primarykey (identificador unico)
        id: string; //el signo de pregunta es por que puede o no venir
    
        @Column() //decorador
        comentario: string;
    
        @CreateDateColumn()
        create_at: Date;
    
        @ManyToOne(() => Noticia, (n) => n.comentarios, { nullable: false }) //la funcion es para q pueda bindear con la propiedad que va a estar del otro lado.
        noticia: Noticia; 
     }