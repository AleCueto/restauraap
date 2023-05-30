import { Component, OnInit } from '@angular/core';
import { Command } from '../../models/command.model';
import { UserService } from '../../services/user.service';
import { CommandService } from '../../services/command.service';

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

}
