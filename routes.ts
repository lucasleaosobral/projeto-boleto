import { Router } from "express";

import { BoletoController } from "./src/controllers/BoletoController";

const boletoController = new BoletoController();

const router = Router();

router.get('/boleto/:linha', (request, response) => {
    return boletoController.handle(request, response);
});

router.get('*', (request, response) => {
     response.status(404).send();
 });
 
export { router };