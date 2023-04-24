import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {


  formRef:FormGroup

  constructor(
    private userService:UserService,
    private router:Router

  ) { 
    this.formRef = new FormGroup({
      email:new FormControl(),
      password:new FormControl(),
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    console.log(this.formRef.value);
    this.userService.register(this.formRef.value)
    .then(response => {
      console.log(response)
      this.router.navigate(['/login']);
    })
    .catch(error => console.log(error));

  }

}


