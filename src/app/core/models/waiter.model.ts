
export interface Waiter {
    id:string;
    name:string;
    surname:string;
    picture:string;
    isBusy:boolean;
    enabled:boolean;
    //Counter of tables that is attending the waiter
    tablesAttended:number;
    idRestaurant:string;
}