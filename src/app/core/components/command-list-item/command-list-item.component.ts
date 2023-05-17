import { Component, Input, OnInit } from '@angular/core';
import { Command } from '../../models/command.model';
import { CommandService } from '../../services/command.service';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { Dish } from '../../models/dish.model';
import { DishesService } from '../../services/dishes.service';

@Component({
  selector: 'app-command-list-item',
  templateUrl: './command-list-item.component.html',
  styleUrls: ['./command-list-item.component.scss'],
})
export class CommandListItemComponent implements OnInit {

  @Input() commandInput:Command | undefined;

  dishes:Dish[] | undefined
  
  constructor(
    private commandService:CommandService,
    public imageService:ImageService,
    private userService:UserService,
    private dishesService:DishesService
  ) { }

  ngOnInit() {
    this.dishes = this.commandInput?.dishesList
  
    const objetosUnicos: any[] = [];
    const contadorRepeticiones: { [key: string]: number } = {};
    
    this.dishes!.forEach(objeto => {
      const key = JSON.stringify(objeto);
    
      if (contadorRepeticiones[key]) {
        contadorRepeticiones[key]++;
      } else {
        contadorRepeticiones[key] = 1;
        objetosUnicos.push(objeto);
      }
    });

    console.log(objetosUnicos); // Output: [1, 2, 3, 4, 5]
    console.log(contadorRepeticiones); // Output: { "1": 2, "2": 2, "3": 3, "4": 2, "5": 1 }

  }
}
