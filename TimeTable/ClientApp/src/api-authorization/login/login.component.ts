import { Component, OnInit } from '@angular/core';
import { AuthorizeService, AuthenticationResultStatus } from '../authorize.service';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { LoginActions, QueryParameterNames, ApplicationPaths, ReturnUrlType } from '../api-authorization.constants';
import { FormControl, FormGroup } from '@angular/forms';

// The main responsibility of this component is to handle the user's login process.
// This is the starting point for the login process. Any component that needs to authenticate
// a user can simply perform a redirect to this component with a returnUrl query parameter and
// let the component perform the login and return back to the return url.
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

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


  private async login(): Promise<void> {
    console.log(this.userForm.value)
    this.authorizeService.SignIn( this.userForm.value)
  }  
}

