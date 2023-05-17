import { Dish } from "./dish.model";

export interface Command {
    description:string,
    dishesList:Dish[],
    idRestaurant:string,
    idTable:string,
    title:string,
    totalPrice:number
}