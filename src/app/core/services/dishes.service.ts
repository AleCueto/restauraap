import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Dish } from '../models/dish.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private firestore:Firestore) { }

  addDish(dish:Dish){
    const dishRef = collection(this.firestore, 'dishes');
    return addDoc(dishRef, dish);
  }

  getDishes(): Observable<Dish[]>{
    const dishRef = collection(this.firestore, 'dishes');
    return collectionData(dishRef, {idField:'id'}) as Observable<Dish[]>;
  }

  deleteDish(dish:Dish){
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return deleteDoc(dishDocRef);
  }

  editDish(dish:Dish){
    console.log(dish);
    const dishData = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image
    }

    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return updateDoc(dishDocRef, dishData);
  }
}
