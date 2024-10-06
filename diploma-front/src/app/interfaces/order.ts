export interface Order {
    order_id?:number;
    order_date:Date;
    payment_type:String;
    person_id?:number;
    seller_id?:number;
    post_id?:number;
    status:String;
}
