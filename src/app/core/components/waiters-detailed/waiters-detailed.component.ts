import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Waiter } from '../../models/waiter.model';
import { Subscription } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { ImageService } from '../../services/image.service';

@Component({
  selector: 'app-waiters-detailed',
  templateUrl: './waiters-detailed.component.html',
  styleUrls: ['./waiters-detailed.component.scss'],
})
export class WaitersDetailedComponent implements OnInit {

  // Reactive form declaration
  form: FormGroup;
  // Mode indicator: "New" or "Edit"
  mode: "New" | "Edit" = "New";
  // Array of available images
  images: string[] = [];

  // Setter to set the waiter values in the form
  @Input('waiter') set waiter(waiter: Waiter) {
    if (waiter) {
      this.form.controls['name'].setValue(waiter.name);
      this.form.controls['surname'].setValue(waiter.surname);
      this.form.controls['isBusy'].setValue(waiter.isBusy);
      this.form.controls['enabled'].setValue(waiter.enabled);
      this.form.controls['picture'].setValue(waiter.picture);
      this.mode = "Edit";
    }
  }

  subsr: Subscription;

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private imagesService: ImageService,
  ) {
    // Subscription to changes in available images
    this.subsr = this.imagesService.images$.subscribe(data => this.images = data);

    // Initializing the form with fields and validations
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      surname: ['', [Validators.required]],
      picture: ['', [Validators.required]],
      isBusy: [],
      enabled: [],
    });
  }

  ngOnInit() {
    // Get available images on component initialization
    this.imagesService.getImages();
  }

  /**
   * Method to submit the form and close the modal
   */
  onSubmit() {
    this.modal.dismiss({ waiter: this.form.value, mode: this.mode }, 'ok');
  }

  /**
   * Method to dismiss the modal without submitting the form
   * @param result The result value to dismiss the modal with
   */
  onDismiss(result: any) {
    this.modal.dismiss(null, 'cancel');
  }

  /**
   * Method to upload an image
   * @param $event The event containing the uploaded image
   */
  uploadImage($event: any) {
    this.imagesService.uploadImage($event)
  }

  /**
   * Method to get the available images
   * @returns The array of available images
   */
  getImages() {
    return this.images;
  }

}
