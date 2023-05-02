import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Table } from '../models/table.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class TableService {

  constructor(private firestore:Firestore, private userService:UserService) { }

  addTable(Table:Table){

    Table.idRestaurant = this.userService.getUid()

    const TableRef = collection(this.firestore, 'tables');
    console.log(Table)
    return addDoc(TableRef, Table);
  }

  getTable(): Observable<Table[]>{
    const TableRef = collection(this.firestore, 'tables');
    return collectionData(TableRef, {idField:'id'}) as Observable<Table[]>;
  }

  deleteTable(table:Table){
    const TableDocRef = doc(this.firestore, `tables/${table.id}`);
    return deleteDoc(TableDocRef);
  }

  editTable(table:Table){
    console.log(table);
    console.log(table.idWaiter)
    const tableData = {
      id: table.id,
      number: table.number,
      info: table.info,
      idWaiter: table.idWaiter,
      isReserved: table.isReserved,
    }

    const TableDocRef = doc(this.firestore, `tables/${table.id}`);
    return updateDoc(TableDocRef, tableData);
  }
}
