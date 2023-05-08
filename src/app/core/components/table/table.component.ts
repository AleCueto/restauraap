import { Component, OnInit } from '@angular/core';
import { TableService } from '../../services/table.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { Table } from '../../models/table.model';
import { TablesDetailedComponent } from '../tables-detailed/tables-detailed.component';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {


  tables: Table[] | undefined;

  constructor(
    private modal:ModalController,
    private alert:AlertController,
    private tableService:TableService,
    private imageService:ImageService,
    private userService:UserService
  ) { }
  
  ngOnInit() {
    this.tableService.getTable().subscribe(tables =>{
      this.tables = tables;
      this.tables = this.tables?.filter(e => this.checkTableBelong(e));
    })

  }



  async presentTableForm(table: Table | null) {
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
            this.tableService.addTable(result.data.table);
            break;
          case 'Edit':
            result.data.table.id = table?.id;
            this.tableService.editTable(result.data.table);
            break;
          default:
        }
      }
    });
  }

  onNewTable(){
    this.presentTableForm(null);  
  }

  checkTableBelong(Table:Table){
    if(Table.idRestaurant == this.userService.getUid()){
      return true
    } else{
      return false
    }
  }

  

}
