export default class CustomerReview {
    constructor(
        public ID:number,
        public Stars:number,
        public Review: string,
        public UserId:number,
        public ItemId:number,
        public FullName?:string
    ) { }
}

export const initCustomerReviewModal:CustomerReview={
    ID:0,
    Stars:5,
    Review: '',
    UserId:0,
    ItemId:0,
    FullName:''
}