export class Boleto {
    private barcode!: string;
    private amount!: string;
    private expirationDate!: string;

    public getBarcode(): string {
        return this.barcode;
    }

    public setBarcode(barcode: string): void {
        this.barcode = barcode;
    }

    public getAmount(): string {
        return this.amount;
    }

    public setAmount(amount: string): void {
        this.amount = amount;
    }

    public getExpirationDate(): string {
        return this.expirationDate;
    }

    public setExpirationDate(expirationDate: string): void {
        this.expirationDate = expirationDate;
    }

}