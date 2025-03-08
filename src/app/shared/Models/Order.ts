import { Address } from "../interfaces/address";
import Item from "./Item";

export default class OrderModel {
    constructor(
        public VoucherID:number,
        public CompanyID: Number,
        public IntervalID:number,
        public Voucher_Type:string,
        public AccID :number,
        public VatTypeID:number,
        public CurrencyID:number,
        public TheRate:number,
        public StatusID:number,
        public VoucherDate:Date,
        public EcommerceAddId:Number,
        public orderItems:Item[],
        public billingAddress:Address,
        public DiscountAmount:number,public DiscountPercent:number,
        public FrightAmount:number,
        public statusstring?:string,
        public DueDate?:Date,
        public gift?:boolean,

    ) { }
}