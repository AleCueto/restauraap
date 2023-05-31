import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Table } from '../models/table.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private firestore: Firestore, private userService: UserService) { }

  /**
   * Adds a table to Firestore collection
   * @param table The table object to add
   * @returns A promise that resolves when the table is added
   */
  addTable(table: Table) {
    table.idRestaurant = this.userService.getUid();
    const tableRef = collection(this.firestore, 'tables');
    // console.log(table);
    return addDoc(tableRef, table);
  }

  /**
   * Retrieves the tables from Firestore collection
   * @returns An observable of table array
   */
  getTables(): Observable<Table[]> {
    const tableRef = collection(this.firestore, 'tables');
    return collectionData(tableRef, { idField: 'id' }) as Observable<Table[]>;
  }

  /**
   * Deletes a table from Firestore collection
   * @param table The table object to delete
   * @returns A promise that resolves when the table is deleted
   */
  deleteTable(table: Table) {
    const tableDocRef = doc(this.firestore, `tables/${table.id}`);
    return deleteDoc(tableDocRef);
  }

  /**
   * Updates a table in Firestore collection
   * @param table The table object to update
   * @returns A promise that resolves when the table is updated
   */
  editTable(table: Table) {
    // console.log(table);
    // console.log(table.idWaiter);
    const tableData = {
      id: table.id,
      number: table.number,
      info: table.info,
      idWaiter: table.idWaiter,
      needsAttention: table.needsAttention,
    }
    const tableDocRef = doc(this.firestore, `tables/${table.id}`);
    return updateDoc(tableDocRef, tableData);
  }
}
