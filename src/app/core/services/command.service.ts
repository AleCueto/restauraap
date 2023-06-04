import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, doc, deleteDoc, updateDoc } from '@angular/fire/firestore';
import { Command } from '../models/command.model';
import { Observable } from 'rxjs';
import { UserService } from './user.service';
import { saveAs } from 'file-saver';
import * as fs from 'fs';

@Injectable({
  providedIn: 'root'
})
export class CommandService {

  commands: Command[] | undefined;

  constructor(private firestore: Firestore, private userService: UserService) { }

  ngOnInit() {
    this.getCommands().subscribe(commands => {
      this.commands = commands;
      this.commands = this.commands?.filter((command) => this.checkCommandBelong(command));
    });

    console.log("ewrwegrwe" + this.commands);
  }

  /**
   * Retrieves the commands from the Firestore collection
   * @returns An observable that emits an array of commands
   */
  getCommands(): Observable<Command[]> {
    const commandRef = collection(this.firestore, 'commands');
    return collectionData(commandRef, { idField: 'id' }) as Observable<Command[]>;
  }

  /**
   * Checks if a command belongs to the current user
   * @param command The command to be checked
   * @returns True if the command belongs to the user, false otherwise
   */
  checkCommandBelong(command: Command) {
    if (command.idRestaurant == this.userService.getUid()) {
      return true;
    } else {
      // console.log("dish.idRestaurant: " + dish.idRestaurant  + "||" + "user UID: " + this.userService.getUid())
      return false;
    }
  }

 /**
   * Saves an object as a JSON file
   * @param obj The object to be saved as JSON
   */
 saveJsonFile(obj: any) {
  // Convert the object to JSON
  const json = JSON.stringify(obj, null, 2);
  
  // Create a Blob object with the JSON content
  const blob = new Blob([json], { type: 'application/json' });
  
  // Create a URL for the Blob
  const url = URL.createObjectURL(blob);
  
  // Create a download link
  const downloadLink = document.createElement('a');
  downloadLink.href = url;
  downloadLink.download = 'file.json';
  downloadLink.style.display = 'none';
  
  // Add the link to the document
  document.body.appendChild(downloadLink);
  
  // Click the link to download the file
  downloadLink.click();
  
  // Remove the link from the document
  document.body.removeChild(downloadLink);
  
  // Release the Blob URL after a certain time
  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
}
}
