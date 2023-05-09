import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { TablesDetailedComponent } from '../tables-detailed/tables-detailed.component';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';

@Component({
  selector: 'app-table-list-item',
  templateUrl: './table-list-item.component.html',
  styleUrls: ['./table-list-item.component.scss'],
})
export class TableListItemComponent implements OnInit {

  @Input() tableInput:Table | undefined;

  waiter:any|undefined;

  waiterImageUrl:string = ""

  constructor(
    private tablesService:TableService,
    private alert:AlertController,
    private modal:ModalController,
    public imageService:ImageService,
    private userService:UserService,
    private waiterService:WaitersService
  ) {

    // this.waiter = firestore

  }

  ngOnInit() {

    // this.waiter = this.waiterService.getWaiterById(this.tableInput!.idWaiter)
    

    this.waiterService.getWaiterById(this.tableInput!.idWaiter).subscribe(
      waiter => {
        this.waiter = waiter;
        console.log(this.waiter)

        this.imageService.getImageUrlByName(this.waiter.picture).subscribe(
          url => {
            console.log(url);
            this.waiterImageUrl = url;
          },
          error => console.log(error)
        );
        
      },
      error => console.log(error)
    );

    // this.imageService.getImageUrlByName(this.waiter.image).subscribe(
    //   url => {
    //     console.log(url);
    //     this.waiterImageUrl = url;
    //   },
    //   error => console.log(error)
    // );
    
      // console.log(this.waiter)


  }


  async deleteTable(table:Table){
    console.log("rfwe");
    await this.tablesService.deleteTable(table);
  }

  
  async onDeleteAlert(table:Table) {
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar este plato?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: async () => {
            await this.deleteTable(table)
          },
        },
      ],
    });

    await alert.present();

    const { role } = await alert.onDidDismiss();
  }

  async presenttableForm(table: Table | null) {
    const modal = await this.modal.create({
      component: TablesDetailedComponent,
      componentProps: {
        table: table
      },
    });
    modal.present();
    modal.onDidDismiss().then(result => {
      if (result && result.data) {
        switch (result.data.mode) {
          case 'New':
            console.log(result.data.table)
            this.tablesService.addTable(result.data.table);
            break;
          case 'Edit':
            result.data.table.id = table?.id;
            this.tablesService.editTable(result.data.table);
            break;
          default:
        }
      }
    });
  }


  onEdittable(table:Table){
    this.presenttableForm(table);
  }
}
