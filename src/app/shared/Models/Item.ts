import ItemImages from "./ItemImages";
import { ItemColor, ItemSize } from "./ItemProp";

export default class Item {
    constructor(public ItemID: Number,
        public ItemIDForUser: string,
        public ItemArName: string,
        public ItemEnName: string,
        public CategoryID1: Number,
        public CategoryID2: Number,
        public CategoryID: Number,
        public RecordDateEntry: Date,
        public PriceLevel_Price: number,
        public ImagePath?: string,
        public itemimages?: ItemImages[],
        public ItemNote?: string,
        public IsOutOfStock?: boolean,
        public Note?: string,
        public ColorID?: number,
        public colorArName?: string,
        public colorEnName?: number,
        public SizeID?: number,
        public sizeArName?: string,
        public sizeEnName?: string,
        public StoreID?: number,
        public StoreArName?: string,
        public StoreEnName?: string,
        public quantity?: number,
        public IsSellingFaset?: boolean, 
        public RelatedNo?: string,
        public Sizelist?:ItemSize[],
        public Colorlist?:ItemColor[],
        public ecommerceDiscountPercentage:number=0.0,
        public ID?:number,
        public existwishlist:boolean=false,
        public Specification?:String,
        public campaign_DiscountPercentage? :number,


    ) { }
}