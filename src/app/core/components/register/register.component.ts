import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register-c',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formRef: FormGroup;
  errorMessage?: string;
  errorOccurred?: boolean;

  constructor(private userService: UserService, private router: Router) {
    // Initialize the form with form controls and validators
    this.formRef = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {}

  /**
   * Handles the form submission.
   * 
   * @description This function is called when the user submits the registration form.
   *              It checks if the form is valid.
   *              If it is valid, it calls the `register` method of the UserService to register the user.
   *              If registration is successful, it logs the response and navigates to the login page.
   *              If an error occurs during registration, it sets the error message and flag to display the error.
   *              If the form is invalid, it sets an error message and flag to display the validation errors.
   */
  onSubmit() {
    if (this.formRef.valid) {
      this.userService
        .register(this.formRef.value)
        .then((response: any) => {
          console.log(response);
          this.router.navigate(['/login']);
        })
        .catch((error: any) => {
          this.errorMessage = this.getErrorMessage(error);
          this.errorOccurred = true;
        });
    } else {
      this.errorMessage = 'Please fix the errors and try again.';
      this.errorOccurred = true;
    }
  }
 /**
   * Gets the error message based on the error code.
   * 
   * @param error - The error object
   * @returns The corresponding error message
   * 
   * @description This function takes an error object and returns the appropriate error message based on the error code.
   *              It checks the `error.code` and returns the corresponding message.
   *              If the error code is not recognized, it returns a generic error message.
   */
 getErrorMessage(error: any) {
  if (error?.code) {
    switch (error.code) {
      case 'auth/email-already-in-use':
        return 'Email already in use, please login.';
      case 'auth/weak-password':
        return 'Weak password, please choose a stronger one.';
      case 'auth/invalid-email':
        return 'Invalid email address, please provide a valid one.';
      default:
        return 'An error occurred. Please try again later.';
    }
  }

  return 'An error occurred. Please try again later.';
}

/**
 * Navigates to the login page.
 * 
 * @description This function is called when the user wants to navigate to the login page.
 *              It uses the Router service to navigate to the '/login' route.
 */
goLogin() {
  this.router.navigate(['/login']);
}
}
