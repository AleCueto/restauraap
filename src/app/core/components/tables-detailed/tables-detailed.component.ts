import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { ImageService } from '../../services/image.service';
import { Table } from '../../models/table.model';
import { WaitersService } from '../../services/waiters.service';
import { Waiter } from '../../models/waiter.model';

@Component({
  selector: 'app-tables-detailed',
  templateUrl: './tables-detailed.component.html',
  styleUrls: ['./tables-detailed.component.scss'],
})
export class TablesDetailedComponent implements OnInit {
  // List of waiters
  waiters: Waiter[] | undefined;

  // Variables for tracking the current and new waiter
  actualWaiter: any;
  newWaiter: any;

  // Form group for managing the table details
  form: FormGroup;
  // Mode can be "New" or "Edit"
  mode: "New" | "Edit" = "New";

  // Input property for receiving the table data
  @Input('table') set table(table: Table) {
    if (table) {
      // Set the form values with the table data
      this.form.controls['number'].setValue(table.number);
      this.form.controls['info'].setValue(table.info);
      this.form.controls['needsAttention'].setValue(table.needsAttention);
      this.form.controls['idWaiter'].setValue(table.idWaiter);
      this.mode = "Edit";

      // Save the waiter we had to subtract a table attended in case another waiter is assigned in the submit method
      if (table.idWaiter != "") {
        // Get the waiter details by their ID
        this.waitersService.getWaiterById(table!.idWaiter).subscribe(
          waiter => {
            this.actualWaiter = waiter;
            this.actualWaiter.id = table.idWaiter;
            console.log("ACTUAL WAITER: " + this.actualWaiter.id);
          },
          error => console.log(error)
        );
      }
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private waitersService: WaitersService
  ) {
    // Initialize the form group with form controls
    this.form = this.fb.group({
      number: ['', [Validators.required]],
      info: [''],
      needsAttention: [true],
      idWaiter: ['']
    });
  }

  ngOnInit() {
    // Fetch the list of waiters
    this.waitersService.getWaiters().subscribe(waiters => {
      this.waiters = waiters;
    });
  }

/**
 * Handles the form submission.
 * 
 * @description This function is called when the user submits the form. It updates the details of the current waiter and the newly selected waiter.
 *              If there is a current waiter assigned to the table, it reduces the number of tables attended by that waiter.
 *              If the newly selected waiter is different from the current waiter, it increases the number of tables attended by the new waiter.
 *              Finally, it dismisses the modal and passes the updated table data and mode as the result.
 */
onSubmit() {
  // Check if there is an actual waiter assigned to the table
  if (this.actualWaiter) {
    // Check if the selected waiter is different from the current waiter
    if (this.form.value.idWaiter != this.actualWaiter) {
      // Reduce the number of tables attended by the current waiter
      this.actualWaiter.tablesAttended--;
      
      // Check if the number of tables attended becomes zero or negative
      if (this.actualWaiter.tablesAttended <= 0) {
        console.log(this.actualWaiter.tablesAttended);
        this.actualWaiter.isBusy = false;
      }
  
      // Update the current waiter's details
      this.waitersService.editWaiter(this.actualWaiter);
    }
  }

  // Fetch the details of the newly selected waiter
  this.waitersService.getWaiterById(this.form.value.idWaiter).subscribe(
    /**
     * @param waiter - The details of the newly selected waiter
     */
    waiter => {
      console.log("ewrfewregrweewg: " + waiter);
      this.newWaiter = waiter;
      this.newWaiter.id = this.form.value.idWaiter;
      console.log("NEW WAITER "  +  this.newWaiter.id);
      
      // Increase the number of tables attended by the new waiter
      this.newWaiter.tablesAttended++;
      this.newWaiter.isBusy = true;
      
      // Update the new waiter's details
      this.waitersService.editWaiter(this.newWaiter);
    },
    /**
     * @param error - The error that occurred during the API call
     */
    error => console.log(error)
  );

  // Dismiss the modal and pass the table data and mode as the result
  this.modal.dismiss({ table: this.form.value, mode: this.mode }, 'ok');
}

/**
 * Dismisses the modal without passing any result.
 * 
 * @param result - The result to be passed when dismissing the modal.
 * 
 * @description This function is called when the user wants to close the modal without saving any changes.
 *              It simply dismisses the modal without returning any data.
 */
onDismiss(result: any) {
  this.modal.dismiss(null, 'cancel');
}



}
