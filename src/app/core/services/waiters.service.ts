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
  constructor(private firestore:Firestore, 
              private userService:UserService, 
              private storage:Storage,) { }

  addWaiter(waiter:Waiter){

    waiter.idRestaurant = this.userService.getUid()

    waiter.tablesAttended = 0

    const waiterRef = collection(this.firestore, 'waiters');
    console.log(waiter)
    return addDoc(waiterRef, waiter);
  }

  getWaiters(): Observable<Waiter[]>{
    const waiterRef = collection(this.firestore, 'waiters');
    return collectionData(waiterRef, {idField:'id'}) as Observable<Waiter[]>;
  }

  deleteWaiter(waiter:Waiter){
    const waiterDocRef = doc(this.firestore, `waiters/${waiter.id}`);
    return deleteDoc(waiterDocRef);
  }

  editWaiter(waiter:Waiter){
    console.log(waiter);
    const waiterData = {
      id: waiter.id,
      name: waiter.name,
      surname: waiter.surname,
      picture: waiter.picture,
      enabled: waiter.enabled,
      isBusy: waiter.isBusy,
      // tablesAttended: waiter.tablesAttended
    }

    const waiterDocRef = doc(this.firestore, `waiters/${waiter.id}`);
    return updateDoc(waiterDocRef, waiterData);
  }

  /**
   * Gets from firestore document and returns it
   * @param id - id of waiter we want to get
   * @returns specific waiter based on id
   */
  getWaiterById(id:string){
    // const docRef = doc(this.firestore, "waiters", id);
    // const docSnap = await getDoc(docRef)
    // console.log(docSnap.data())
    // return docSnap.data()
    
    const docRef = doc(this.firestore, "waiters", id);
    return from(getDoc(docRef)).pipe(
      map(docSnap => docSnap.data())
    );

  }

}
