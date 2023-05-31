import { Component, OnInit } from '@angular/core';
import { Command } from '../../models/command.model';
import { UserService } from '../../services/user.service';
import { CommandService } from '../../services/command.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-command',
  templateUrl: './command.component.html',
  styleUrls: ['./command.component.scss'],
})
export class CommandComponent implements OnInit {

  commands:Command[] | undefined;

  constructor(
    private userService:UserService,
    private commandService:CommandService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.commandService.getCommands().subscribe(commands =>{
      this.commands = commands
      this.commands = this.commands?.filter((command) => this.checkCommandBelong(command))
    })
  }

  checkCommandBelong(command:Command){
    if(command.idRestaurant == this.userService.getUid()){
      return true
    } else{
      // console.log("dish.idRestaurant: " + dish.idRestaurant  + "||" + "user UID: " + this.userService.getUid())
      return false
    }
  }

  downloadJson(){
    this.commandService.saveJsonFile(this.commands);
  }

  getDownloadLink() {
    const filePath = 'src\\app\\core\\python\\datos.json';
    return this.sanitizer.bypassSecurityTrustUrl(filePath);
  }

  downloadFile(): void {
    const filePath = '../../python/graficos_reporte.zip'; // Reemplaza con la ruta correcta a tu archivo JSON
    const link = document.createElement('a');
    link.href = filePath;
    link.download = 'report.zip'; // Reemplaza con el nombre que deseas que tenga el archivo JSON descargado
    link.target = '_blank'; // Para abrir el enlace en una nueva pestaña (opcional)
    link.click();
  }

}
