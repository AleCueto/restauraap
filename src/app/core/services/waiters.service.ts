import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Waiter } from '../models/waiter.model';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, updateDoc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Storage, ref } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class WaitersService {
  constructor(private firestore:Firestore, private userService:UserService, private storage:Storage) { }

  addWaiter(waiter:Waiter){

    waiter.idRestaurant = this.userService.getUid()

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
      isBusy: waiter.isBusy
    }

    const waiterDocRef = doc(this.firestore, `waiters/${waiter.id}`);
    return updateDoc(waiterDocRef, waiterData);
  }
}
