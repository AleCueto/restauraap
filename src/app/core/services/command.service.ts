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

    console.log("ewrwegrwe" + this.commands)
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

  // saveJsonFile(){
  //   let jsonString = JSON.stringify(this.commands);


  // }

  saveJsonFile(obj:any) {
    // Convertir el objeto a JSON
    const json = JSON.stringify(obj, null, 2);
    
    // Crear un objeto Blob con el contenido JSON
    const blob = new Blob([json], { type: 'application/json' });
    
    // Crear una URL del Blob
    const url = URL.createObjectURL(blob);
    
    // Crear un enlace de descarga
    const enlaceDescarga = document.createElement('a');
    enlaceDescarga.href = url;
    enlaceDescarga.download = 'archivo.json';
    enlaceDescarga.style.display = 'none';
    
    // Agregar el enlace al documento
    document.body.appendChild(enlaceDescarga);
    
    // Hacer clic en el enlace para descargar el archivo
    enlaceDescarga.click();
    
    // Remover el enlace del documento
    document.body.removeChild(enlaceDescarga);
    
    // Liberar la URL del Blob después de un cierto tiempo
    setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 1000);
  }
  



}
