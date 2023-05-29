import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { error } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  formLogin:FormGroup

  constructor(
    private userService: UserService,
    private router: Router
  ) {

    this.formLogin = new FormGroup({
      email: new FormControl(),
      password: new FormControl()
    })
  }

  ngOnInit(): void {

  }

  onSubmit() {
    console.log(this.formLogin.value)
    this.userService.login(this.formLogin.value)
    .then(response => {
      console.log(response);
      this.router.navigate(['/folder/Dish']);
    })
    .catch(error => console.log(error));
  }

  onClick(){
    this.userService.loginWithGoogle()
    .then(response =>{
      console.log(response);
      this.router.navigate(['/folder/Dish']);
    })
    .catch(error => console.log(error))
  }

  goRegister(){
    this.router.navigate(['/register']);
  }

}
