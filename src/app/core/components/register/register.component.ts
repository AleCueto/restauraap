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
    this.formRef = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  ngOnInit(): void {}

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

  goLogin() {
    this.router.navigate(['/login']);
  }
}
