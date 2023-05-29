import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc} from '@angular/fire/firestore';
import { Command } from '../models/command.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { saveAs } from 'file-saver';
import * as fs from 'fs';



@Injectable({
  providedIn: 'root'
})
export class CommandService {

  commands:Command[] | undefined

  constructor(private firestore:Firestore, private userService:UserService) { }

  ngOnInit() {
    this.getCommands().subscribe(commands =>{
      this.commands = commands;
      this.commands = this.commands?.filter((commands) => this.checkCommandBelong(commands))
    })
  }


  getCommands(): Observable<Command[]>{
    const commandRef = collection(this.firestore, 'commands');
    return collectionData(commandRef, {idField:'id'}) as Observable<Command[]>;
  }

  checkCommandBelong(command:Command){
    if(command.idRestaurant == this.userService.getUid()){
      return true
    } else{
      // console.log("dish.idRestaurant: " + dish.idRestaurant  + "||" + "user UID: " + this.userService.getUid())
      return false
    }
  }

  saveJsonFile(){
    let jsonString = JSON.stringify(this.commands);
    localStorage.setItem('myVariable', jsonString);

  }


}
