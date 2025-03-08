import Items from "./Item";

export default class OrderItem {
    constructor(
        public VoucherID:number,
        public CompanyID: Number,
        public IntervalID:number,
        public AccID :number,
        public Voucher_Type:string,
        public ItemID:number,
        public quantity:number,
        public CurrencyID:number,
        public TheRate:number,
        public PriceLevel_Price:number,
        public Equal_Price:number,
        public ItemEnName:string,
        public ItemArName:string,
        public ColorID?: number,
        public colorArName?: string,
        public colorEnName?: number,
        public SizeID?: number,
        public sizeArName?: string,
        public sizeEnName?: string,
        public StoreID?:number,
        public StoreArName?:string,
        public StoreEnName?:string,
    ) { }
}