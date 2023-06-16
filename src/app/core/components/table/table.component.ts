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
    private modal: ModalController,
    private alert: AlertController,
    private tableService: TableService,
    private imageService: ImageService,
    private userService: UserService
  ) { }
  
  /**
   * Initializes the component.
   * 
   * @description This function is called when the component is initialized.
   *              It retrieves the list of tables and filters them to only include tables that belong to the current user.
   */
  ngOnInit() {
    this.tableService.getTables().subscribe(tables => {
      this.tables = tables;
      this.tables = this.tables?.filter(e => this.checkTableBelong(e));
    });
  }
  


/**
 * Opens the table form modal for creating or editing a table.
 * 
 * @param table - The table to be edited, or null for creating a new table
 * 
 * @description This function is called when the user wants to create a new table or edit an existing table.
 *              It opens a modal window with the table form component.
 *              After the modal is dismissed, it checks the result and performs the corresponding action
 *              (addition or edition of the table) based on the mode specified in the result data.
 */
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
          // Do nothing
      }
    }
  });
}

/**
 * Opens the table form modal for creating a new table.
 * 
 * @description This function is called when the user wants to create a new table.
 *              It opens the table form modal with a null table parameter, indicating a new table.
 */
onNewTable() {
  this.presentTableForm(null);  
}

/**
 * Checks if a table belongs to the current user's restaurant.
 * 
 * @param table - The table to be checked
 * @returns True if the table belongs to the current user's restaurant, false otherwise
 * 
 * @description This function is used to determine if a table belongs to the current user's restaurant.
 *              It compares the ID of the restaurant associated with the table with the current user's restaurant ID.
 *              If they match, it returns true; otherwise, it returns false.
 */
checkTableBelong(table: Table) {
  if (table.idRestaurant == this.userService.getUid()) {
    return true;
  } else {
    return false;
  }
}

  

}
