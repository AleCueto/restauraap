import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Dish } from '../models/dish.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private firestore: Firestore, private userService: UserService) { }

  /**
   * Adds a dish to the Firestore collection
   * @param dish The dish object to be added
   * @returns A promise that resolves when the dish is added successfully
   */
  addDish(dish: Dish) {
    dish.idRestaurant = this.userService.getUid();

    const dishRef = collection(this.firestore, 'dishes');
    // console.log(dish);
    return addDoc(dishRef, dish);
  }

  /**
   * Retrieves the dishes from the Firestore collection
   * @returns An observable that emits an array of dishes
   */
  getDishes(): Observable<Dish[]> {
    const dishRef = collection(this.firestore, 'dishes');
    return collectionData(dishRef, { idField: 'id' }) as Observable<Dish[]>;
  }

  /**
   * Deletes a dish from the Firestore collection
   * @param dish The dish object to be deleted
   * @returns A promise that resolves when the dish is deleted successfully
   */
  deleteDish(dish: Dish) {
    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return deleteDoc(dishDocRef);
  }

  /**
   * Edits a dish in the Firestore collection
   * @param dish The dish object with updated values
   * @returns A promise that resolves when the dish is updated successfully
   */
  editDish(dish: Dish) {
    // console.log(dish);
    const dishData = {
      id: dish.id,
      name: dish.name,
      price: dish.price,
      image: dish.image
    };

    const dishDocRef = doc(this.firestore, `dishes/${dish.id}`);
    return updateDoc(dishDocRef, dishData);
  }
}
