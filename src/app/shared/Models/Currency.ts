export default class CurrencyModel {
    constructor(
       public CurrencyID:number,
       public CurrencyArName:string,
       public CurrencyEnName:string,
       public CurruncySymbol:string,
       public MinRate:number,
       public MaxRate:number,
       public TheRate:number,
    ) { }
}