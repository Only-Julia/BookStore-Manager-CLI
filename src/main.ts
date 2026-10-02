import readline from "readline";

import { AutorRepository } from "./repositories/AutorRepository.js";
import { AutorService } from "./services/AutorService.js";
import { AutorController } from "./controllers/AutorController.js";
import { menuPrincipal } from "./menus/menuPrincipal.js";


const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


const autorRepository = new AutorRepository();

const autorService = new AutorService(
    autorRepository
);

const autorController = new AutorController(
    autorService,
    rl
);


await menuPrincipal(
    autorController,
    rl
);


rl.close();