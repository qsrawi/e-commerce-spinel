import CouponsDet from "./CouponsDet";

export default class Coupons {
    constructor(
        public CouponId: Number,
        public CouponString: string, 
        public EndDate: Date,
        public DiscountPercentage: number,
        public IsScrolling:boolean,
        public ScrollingText:Text,
        public ScrollingUrl:Text,
        public CouponsDetlist:CouponsDet[]
       ) {}
}