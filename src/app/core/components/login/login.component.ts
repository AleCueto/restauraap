import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;
  loginError: string = '';

  constructor(
    private userService: UserService,
    private router: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  onSubmit() {
    console.log(this.formLogin.value);
    if (this.formLogin.invalid) {
      if (this.formLogin.controls['email'].errors!['pattern']) {
        this.loginError = 'Por favor, ingresa un formato de correo electrónico válido.';
      } else {
        this.loginError = 'Por favor, ingresa el correo electrónico y la contraseña.';
      }
      return;
    }

    this.userService
      .login(this.formLogin.value)
      .then((response) => {
        console.log(response);
        this.router.navigate(['/folder/Home']);
      })
      .catch((error) => {
        console.log(error);
        if (error.status === 401) {
          this.loginError = 'Error de autenticación. Verifica tus credenciales.';
        } else if (error.status === 404) {
          this.loginError = 'Usuario no encontrado.';
        } else {
          this.loginError = 'Error al iniciar sesión. Por favor, inténtalo de nuevo más tarde.';
        }
      });
  }

  onClick() {
    this.userService
      .loginWithGoogle()
      .then((response) => {
        console.log(response);
        this.router.navigate(['/folder/Home']);
      })
      .catch((error) => {
        console.log(error);
        this.loginError = 'Error al iniciar sesión con Google. Por favor, inténtalo de nuevo más tarde.';
      });
  }

  goRegister() {
    this.router.navigate(['/register']);
  }
}
