import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Waiter } from '../models/waiter.model';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc, getDoc } from '@angular/fire/firestore';
import { Observable, from, map, of } from 'rxjs';
import { Storage, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class WaitersService {
  constructor(private firestore: Firestore, 
              private userService: UserService, 
              private storage: Storage) { }

  /**
   * Adds a waiter to Firestore collection
   * @param waiter The waiter object to add
   * @returns A promise that resolves when the waiter is added
   */
  addWaiter(waiter: Waiter) {
    waiter.idRestaurant = this.userService.getUid();
    waiter.tablesAttended = 0;
    const waiterRef = collection(this.firestore, 'waiters');
    // console.log(waiter);
    return addDoc(waiterRef, waiter);
  }

  /**
   * Retrieves the waiters from Firestore collection
   * @returns An observable of waiter array
   */
  getWaiters(): Observable<Waiter[]> {
    const waiterRef = collection(this.firestore, 'waiters');
    return collectionData(waiterRef, { idField: 'id' }) as Observable<Waiter[]>;
  }

  /**
   * Deletes a waiter from Firestore collection
   * @param waiter The waiter object to delete
   * @returns A promise that resolves when the waiter is deleted
   */
  deleteWaiter(waiter: Waiter) {
    const waiterDocRef = doc(this.firestore, `waiters/${waiter.id}`);
    return deleteDoc(waiterDocRef);
  }

  /**
   * Updates a waiter in Firestore collection
   * @param waiter The waiter object to update
   * @returns A promise that resolves when the waiter is updated
   */
  editWaiter(waiter: Waiter) {
    // console.log(waiter);
    const waiterData = {
      id: waiter.id,
      name: waiter.name,
      surname: waiter.surname,
      picture: waiter.picture,
      enabled: waiter.enabled,
      isBusy: waiter.isBusy,
      tablesAttended: waiter.tablesAttended
      // tablesAttended: waiter.tablesAttended
    }
    const waiterDocRef = doc(this.firestore, `waiters/${waiter.id}`);
    return updateDoc(waiterDocRef, waiterData);
  }

  /**
   * Gets a specific waiter from Firestore based on ID
   * @param id The ID of the waiter to retrieve
   * @returns An observable that emits the specific waiter object
   */
  getWaiterById(id: string) {
    const docRef = doc(this.firestore, "waiters", id);
    return from(getDoc(docRef)).pipe(
      map(docSnap => docSnap.data())
    );
  }
}
