import readline from "readline";

import { AutorRepository } from "./repositories/AutorRepository.js";
import { LivroRepository } from "./repositories/LivroRepository.js";

import { AutorService } from "./services/AutorService.js";
import { LivroService } from "./services/LivroService.js";

import { AutorController } from "./controllers/AutorController.js";
import { LivroController } from "./controllers/LivroController.js";

import { menuPrincipal } from "./menus/menuPrincipal.js";


const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


const autorRepository = new AutorRepository();

const livroRepository = new LivroRepository();


const autorService = new AutorService(

    autorRepository

);

const livroService = new LivroService(

    livroRepository,
    autorRepository

);


const autorController = new AutorController(

    autorService,

    rl

);

const livroController = new LivroController(

    livroService,

    rl

);


await menuPrincipal(

    autorController,
    livroController,
    rl

);


rl.close();