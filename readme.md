## Guia 🪅​
* Crear carpeta "nombredelproyecto"
* Ingresar a la carpeta con  ```cd nombredelproyecto```
* Ejecutar el comando ```npm init -y```
* Instalar todas la dependencias necesarias para iniciar el proyecto
    ```
    npm install express dotenv ejs 
    ```
    Dependencias de desarollo 

    ```
    npm install -D @types/express @types/node
    ```
* Crear archivo tsconfig.json
```
{
    "compilerOptions": {
        "target": "ES2018",
        "module": "commonjs",
        "outDir": "./dist",
        "strict": true,
        "esModuleInterop": true,
    }
}
```

* Crear estructara 
```
blog-mvc-ejs/
  ├─ src/
  │   ├─ controllers/
  │   ├─ views/
  │   ├─ routes/
  │   ├─ models/
  ├─ server.ts
  ├─ package.json
  ├─ tsconfig.json

```

* agregar script en el package.json
```
		"dev": "nodemon server.ts"
```

* Crear repositorio en git con github Desktop 🐱

* Ejecutar docker-compose up -d
  
###Intalacion de TipeORM
* npm install typeorm --save
* npm install reflect-metadata --save
* npm install mysql2 --save

##Crear Logger

##Crear: noticias.entity - usuarios.entity - comentarios.entity

##importar: 

* npm install bcrypt
* npm i uuid        

##Loggin Sessiones
* npm install express-session@1.17.0 cookie-parser
* npm i --save-dev @types/express-session @types/cookie-parser 

##instalaciones para compilar
* npm install --save-dev rimraf
para crear en el packege.json 
*  "scripts": {
    "start": "node dist/server.js",
    "clean": "rimraf dist", ** npm run clean: borra el dist
    "tsc": "tsc",
    "copy-assets": "ts-node src/tools/copy-build-view.ts",
    "build": "npm run clean & npm run tsc & npm run copy-assets",
    "dev": "nodemon dist/server.js"
  },
  * npm install --save-dev @types/shelljs shelljs
  * npm run tsc / npm run clean / npm run copy-assets/ 
  * npm run build: aplica/compila los tres pasos
