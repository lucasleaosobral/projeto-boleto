import { Request, Response } from "express";
import { BoletoException } from "../exceptions/BoletoException";
import { BoletoService } from "../services/BoletoService";

const boletoService = new BoletoService();

export class BoletoController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            
            if(!boletoService.validBarCode(request.params.linha)) {
                throw new BoletoException("A linha não pode conter letras e/ou caracteres especiais");
            }

            const barra = boletoService.calculateBarra(request.params.linha);

            const boleto = await boletoService.validateBoleto(barra);
            
            return response
                .status(200)
                .send(boleto);

        } catch (error) {
            
            if(error.name == "BoletoException") {
                
                return response.status(400).json({
                    message: error.message
                });
            } else {
                return response.status(500).json({
                    message: "Internal Server Error"
                });
            }
        }
    }
}