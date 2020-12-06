export class Boleto {
    private barcode: number;
    private amount: string;
    private expirationDate: string;

    public getBarcode(): number {
        return this.barcode;
    }

    public setBarcode(barcode: number): void {
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