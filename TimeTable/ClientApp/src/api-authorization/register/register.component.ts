import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthorizeService } from '../authorize.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  userForm = new FormGroup({
    UserName: new FormControl(''),
    Password: new FormControl(''),
    RememberMe: new FormControl(true)
  })

  constructor(
    private authorizeService: AuthorizeService,
    private router: Router) { }

  async ngOnInit() {

  }


  private async register(): Promise<void> {
    console.log(this.userForm.value)
    this.authorizeService.Register( this.userForm.value)
  }  

}
