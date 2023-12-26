import * as shell from 'shelljs';

// copia todas las vistas
shell.cp('-R', 'src/views', 'dist/src/views'); //copia lo que esta dentro de src 
shell.cp('-R', 'public', 'dist/public'); 
