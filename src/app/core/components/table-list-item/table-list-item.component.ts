import { Component, Input, OnInit } from '@angular/core';
import { Table } from '../../models/table.model';
import { TableService } from '../../services/table.service';
import { AlertController, ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';
import { UserService } from '../../services/user.service';
import { TablesDetailedComponent } from '../tables-detailed/tables-detailed.component';
import { Waiter } from '../../models/waiter.model';
import { WaitersService } from '../../services/waiters.service';
import { lastValueFrom } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-table-list-item',
  templateUrl: './table-list-item.component.html',
  styleUrls: ['./table-list-item.component.scss'],
})
export class TableListItemComponent implements OnInit {

  @Input() tableInput: Table | undefined;

  waiters!: Waiter[];

  waiter: any = {};

  waiterImageUrl: string = "";

  constructor(
    private tablesService: TableService,
    private alert: AlertController,
    private modal: ModalController,
    public imageService: ImageService,
    private userService: UserService,
    private waiterService: WaitersService,
    private translate: TranslateService,
  ) {}

  /**
   * Initializes the component.
   * 
   * @description This function is called when the component is initialized.
   *              It retrieves the list of waiters and assigns the waiter for the current table, if any.
   *              It also fetches the waiter's image URL for display.
   */
  ngOnInit() {
    // Get all the waiters for automatic assignment
    this.waiterService.getWaiters().subscribe(waiters => {
      this.waiters = waiters.filter((w) => w.idRestaurant == this.userService.getUid());
    });

    if (this.tableInput?.idWaiter != "") {
      // Fetch the waiter details for the current table
      this.waiterService.getWaiterById(this.tableInput!.idWaiter).subscribe(
        /**
         * @param waiter - The details of the waiter assigned to the table
         */
        waiter => {
          this.waiter = waiter;
          console.log(this.waiter);

          // Fetch the waiter's image URL for display
          this.imageService.getImageUrlByName(this.waiter.picture).subscribe(
            /**
             * @param url - The URL of the waiter's image
             */
            url => {
              console.log(url);
              this.waiterImageUrl = url;
            },
            error => console.log(error)
          );
        },
        error => console.log(error)
      );
    }
  }

  /**
   * Deletes a table.
   * 
   * @param table - The table to be deleted
   * 
   * @description This function is called when the user wants to delete a table.
   *              It deletes the specified table from the database.
   */
  async deleteTable(table: Table) {
    console.log("rfwe");
    await this.tablesService.deleteTable(table);
  }

/**
 * Displays a confirmation alert before deleting a table.
 * 
 * @param table - The table to be deleted
 * 
 * @description This function is called when the user wants to delete a table.
 *              It displays a confirmation alert to confirm the deletion.
 *              If the user confirms, it calls the deleteTable function to delete the table.
 */
async onDeleteAlert(table: Table) {
  // Create a confirmation alert
  const alert = await this.alert.create({
    header: await lastValueFrom(this.translate.get('generic.warning2')), // Get the translation for the alert header
    message: await lastValueFrom(this.translate.get('table.warning')), // Get the translation for the alert message
    buttons: [
      {
        text: await lastValueFrom(this.translate.get('generic.cancel')), // Get the translation for the cancel button text
        role: 'cancel',
        handler: () => {
          console.log("Operacion cancelada"); // Handle the cancel button click event
        },
      },
      {
        text: await lastValueFrom(this.translate.get('generic.delete')), // Get the translation for the delete button text
        role: 'confirm',
        handler: async () => {
          await this.deleteTable(table); // Call the deleteTable function to delete the table
        },
      },
    ],
  });

  // Display the alert
  await alert.present();

  // Wait for the alert to be dismissed
  const { role } = await alert.onDidDismiss();
}
/**
 * Presents a modal form for adding or editing a table.
 * 
 * @param table - The table to be edited, or null if adding a new table
 * 
 * @description This function is called when the user wants to add a new table or edit an existing table.
 *              It presents a modal form component for adding or editing the table.
 *              After the modal form is dismissed, it checks the result data to determine the action to be taken:
 *              - If the mode is 'New', it calls the addTable function to add the new table to the database.
 *              - If the mode is 'Edit', it updates the table's ID with the original table's ID and calls the editTable function to update the table in the database.
 */
async presenttableForm(table: Table | null) {
  // Create and present the modal form component
  const modal = await this.modal.create({
    component: TablesDetailedComponent,
    componentProps: {
      table: table
    },
  });
  modal.present();

  // Wait for the modal form to be dismissed
  modal.onDidDismiss().then(result => {
    if (result && result.data) {
      // Check the mode of the result data
      switch (result.data.mode) {
        case 'New':
          // Add the new table to the database
          console.log(result.data.table);
          this.tablesService.addTable(result.data.table);
          break;
        case 'Edit':
          // Update the table's ID with the original table's ID and update the table in the database
          result.data.table.id = table?.id;
          this.tablesService.editTable(result.data.table);
          break;
        default:
          // Do nothing if the mode is not recognized
      }
    }
  });
}
/**
 * Cleans up the waiter's information after attending a table.
 * 
 * @description This function is called when the waiter has finished attending a table.
 *              It reduces the number of tables attended by the waiter, updates the waiter's status,
 *              and updates the waiter and table information in the database.
 */
cleanWaiter() {
  // Reduce the number of tables attended by the waiter
  this.waiter.tablesAttended--;
  this.waiter.id = this.tableInput?.idWaiter;

  console.log("rew:" + this.waiter.id);

  // Check if the waiter has no more tables attended
  if (this.waiter.tablesAttended <= 0) {
    console.log(this.waiter.tablesAttended);
    this.waiter.isBusy = false;
  }

  // Update the waiter's information in the database
  this.waiterService.editWaiter(this.waiter);

  // Clear the waiter object
  this.waiter = null;

  // Clear the waiter ID from the table
  const table = this.tableInput;
  table!.idWaiter = "";
  this.tablesService.editTable(table!);
}

/**
 * Opens the table form in edit mode.
 * 
 * @param table - The table to be edited
 * 
 * @description This function is called when the user wants to edit a table.
 *              It opens the table form in edit mode, pre-populating it with the table's data.
 */
onEdittable(table: Table) {
  this.presenttableForm(table);
}

/**
 * Automatically assigns waiters to tables.
 * 
 * @description This function is called to automatically assign waiters to tables.
 *              It follows the following steps:
 *              1. Randomly sorts the array of waiters.
 *              2. Filters out the waiters who are not enabled.
 *              3. Checks if there is a waiter who is not busy.
 *                 - If found, it sets the waiter as busy, increments the number of tables attended by the waiter, and assigns the waiter to the table.
 *              4. Finds the waiter with the fewest tables attended among the remaining waiters.
 *                 - If found, it sets the waiter as busy, increments the number of tables attended by the waiter, and assigns the waiter to the table.
 *              5. If no waiter is available (both waiterNotBussy and waiterLessBussy are not found), it displays an alert.
 */
autoAssingWaiters() {
  let waitersRandom = this.waiters;

  waitersRandom.sort(() => Math.random() - 0.5);

  waitersRandom = waitersRandom.filter((item) => item.enabled == true);

  console.log("Randomly sorted waiters: " + waitersRandom);

  let waiterNotBusy = waitersRandom.find((w) => w.isBusy == false);
  if (waiterNotBusy) {
    // Set waiter as busy
    waiterNotBusy.tablesAttended++;
    waiterNotBusy.isBusy = true;

    console.log("Tables attended by waiter not busy: " + waiterNotBusy.tablesAttended);
    this.waiterService.editWaiter(waiterNotBusy);
    console.log("ID of waiter not busy: " + waiterNotBusy.id);

    // Assign waiterNotBusy to the table
    const table = this.tableInput;
    table!.idWaiter = waiterNotBusy.id;
    this.tablesService.editTable(table!);
  }

  let waiterLessBusy: any;

  if (waitersRandom.length > 0) {
    waiterLessBusy = waitersRandom.reduce((lessBusy, waiter) => {
      if (waiter.tablesAttended < lessBusy.tablesAttended) {
        return waiter;
      } else {
        return lessBusy;
      }
    });
  }

  if (!waiterNotBusy && waiterLessBusy) {
    // Set waiter as busy
    waiterLessBusy.tablesAttended++;
    waiterLessBusy.isBusy = true;
    this.waiterService.editWaiter(waiterLessBusy);

    // Assign waiterLessBusy to the table
    const table = this.tableInput;
    table!.idWaiter = waiterLessBusy.id;
    this.tablesService.editTable(table!);
  }

  if (!waiterNotBusy && !waiterLessBusy) {
    console.log("NO HAY CAMAREROS DISPONIBLES"); // There are no available waiters
    this.onNoWaitersAlert();
  }
}

/**
 * Displays an alert when there are no available waiters.
 * 
 * @description This function is called to display an alert when there are no available waiters.
 *              It shows a warning message to inform the user that there are no active waiters.
 *              The user can dismiss the alert by clicking the accept button.
 */
async onNoWaitersAlert() {
  const alert = await this.alert.create({
    header: await lastValueFrom(this.translate.get('generic.warning2')),
    message: await lastValueFrom(this.translate.get('waiter.not-active')),
    buttons: [
      {
        text: await lastValueFrom(this.translate.get('generic.accept')),
        role: 'cancel',
        handler: () => {
          console.log("Operacion cancelada"); // Operation canceled
        },
      }
    ],
  });

  await alert.present();

  const { role } = await alert.onDidDismiss();
}



}
