import { BoletoException } from "../exceptions/BoletoException";
import { Boleto} from "../models/Boleto";


export class BoletoService {

    private regexBarra = /[^0-9]/g ;
    
    public validateBoleto(barCode: string) {
        
        const linha = this.parseLine(barCode);
        const boleto = new Boleto();
        
        boleto.setBarcode(barCode);
        boleto.setAmount(this.calculateAmount(linha).substring(0, 2));
        boleto.setExpirationDate(this.calculateExpirationDate(linha));
        
        return boleto;
    }

    private calculateExpirationDate(linha:string) {
        const stringDate = linha.substring(39, 44);

        const bacenDate = new Date('1997-10-07T00:00:00');

        bacenDate.setDate(bacenDate.getDate() + parseInt(stringDate));

        return bacenDate.toLocaleString("pt-BR", {year: 'numeric', month: '2-digit', day: '2-digit'}).toString();
    }
    
    private calculateAmount(linha:string) {
        const stringAmount = linha.substring(44, linha.length);

        return parseFloat(stringAmount).toString();
    }

    public validBarCode(barCode:string) {
        const regex = new RegExp('^[0-9]+$');
    
        if(regex.test(barCode)) {
            return true;
        } else {
            return false;
        }
    }


    public calculateBarra(barra:string) {
        barra = barra.replace(this.regexBarra,'');
    
        if (barra.length != 47) {
            throw new BoletoException("Linha deve conter 47 digitos");
        } 
    
        barra  = barra.substr(0,4)
            +barra.substr(32,15)
            +barra.substr(4,5)
            +barra.substr(10,10)
            +barra.substr(21,10)
            ;
        

        if (this.modulo11(barra.substr(0,4)+ barra.substr(5,39)).toString() != barra.substr(4,1)) {
            throw new BoletoException("erro no digito verificador do boleto");
        }

        return barra;
    }

    private modulo10(numero:string) {

        numero = numero.replace(this.regexBarra,'');
        
        let soma  = 0;
        let peso  = 2;
        let contador = numero.length - 1;
        
        
        while (contador >= 0) {
            let multiplicacao = parseInt( numero.substring(contador,contador+1) ) * peso;
            
            if (multiplicacao >= 10) {
                multiplicacao = 1 + (multiplicacao-10);
            }
            
            soma = soma + multiplicacao;
            
            if (peso == 2) {
                peso = 1;
            } else {
                peso = 2;
            }
            
            contador = contador - 1;
        }
        
        let digito = 10 - (soma % 10);
        
        if (digito == 10) {
            digito = 0;
        }
        
        return digito;
    }

    private modulo11(numero: string) {
    
        
        numero = numero.replace(this.regexBarra,'');

        let soma  = 0;
        let peso  = 2;
        const base  = 9;
        let contador = numero.length - 1;
        
        for (let i = contador; i >= 0; i--) {
            
            soma = soma + parseInt(numero.substring(i,i+1)) * peso;
            
            if (peso < base) {
                peso++;
            } else {
                peso = 2;
            }
        }
        let digito = 11 - (soma % 11);
        
        if(digito == 0) {
            digito = 1;
        }

        if (digito == 10 || digito == 11) {
            digito = 1;
        }

        return digito;
    }


    private parseLine(barCode : string) {

        const campo1 = barCode.substring(0,4)+barCode.substring(19,20)+'.'+barCode.substring(20,24);
        const campo2 = barCode.substring(24,29)+'.'+barCode.substring(29,34);
        const campo3 = barCode.substring(34,39)+'.'+barCode.substring(39,44);
        const campo4 = barCode.substring(4,5);
        const campo5 = barCode.substring(5,19);

        if ( this.modulo11(barCode.substr(0,4)+barCode.substr(5,barCode.length)).toString() != campo4 ) {
            throw new BoletoException("erro no digito verificador do boleto");
        }


        return   campo1 + this.modulo10(campo1) + ' '+ campo2 + this.modulo10(campo2) +' '
        +campo3 + this.modulo10(campo3) +' ' +campo4 +' '+ campo5
        ;
    }
}