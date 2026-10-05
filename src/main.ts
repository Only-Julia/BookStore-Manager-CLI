import readline from "readline";

import { AutorRepository } from "./repositories/AutorRepository.js";
import { LivroRepository } from "./repositories/LivroRepository.js";
import { ClienteRepository } from "./repositories/ClienteRepository.js";
import { EmprestimoRepository } from "./repositories/EmprestimoRepository.js";

import { AutorService } from "./services/AutorService.js";
import { LivroService } from "./services/LivroService.js";
import { ClienteService } from "./services/ClienteService.js";
import { EmprestimoService } from "./services/EmprestimoService.js";

import { AutorController } from "./controllers/AutorController.js";
import { LivroController } from "./controllers/LivroController.js";
import { ClienteController } from "./controllers/ClienteController.js";
import { EmprestimoController } from "./controllers/EmprestimoController.js";

import { menuPrincipal } from "./menus/menuPrincipal.js";


const rl = readline.createInterface({

    input: process.stdin,

    output: process.stdout

});


const autorRepository = new AutorRepository();

const livroRepository = new LivroRepository();

const clienteRepository = new ClienteRepository();

const emprestimoRepository = new EmprestimoRepository();


const autorService = new AutorService(

    autorRepository

);

const livroService = new LivroService(

    livroRepository,
    autorRepository

);

const clienteService = new ClienteService(

    clienteRepository

);

const emprestimoService = new EmprestimoService(

    emprestimoRepository,
    livroRepository,
    clienteRepository

);


const autorController = new AutorController(

    autorService,

    rl

);

const livroController = new LivroController(

    livroService,

    rl

);

const clienteController = new ClienteController(

    clienteService,

    rl

);

const emprestimoController = new EmprestimoController(

    emprestimoService,

    rl

);


await menuPrincipal(

    autorController,
    livroController,
    clienteController,
    emprestimoController,
    rl

);


rl.close();