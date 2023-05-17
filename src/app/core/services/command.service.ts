import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Command } from '../models/command.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  constructor(private firestore:Firestore, private userService:UserService) { }

  getCommands(): Observable<Command[]>{
    const commandRef = collection(this.firestore, 'commands');
    return collectionData(commandRef, {idField:'id'}) as Observable<Command[]>;
  }
}
