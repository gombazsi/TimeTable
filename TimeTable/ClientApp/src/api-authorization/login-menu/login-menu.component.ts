import { Component, Injectable, OnInit } from '@angular/core';
import { AuthorizeService } from '../authorize.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-login-menu',
  templateUrl: './login-menu.component.html',
  styleUrls: ['./login-menu.component.css']
})
export class LoginMenuComponent implements OnInit {
  public isAuthenticated :boolean;

  constructor(private authorizeService: AuthorizeService) { }

  ngOnInit() {
    this.authorizeService.isAuthenticated.subscribe((value)=>{
      this.isAuthenticated=value;
      console.log(this.isAuthenticated); 
    })    
  }

  public logout(){
    this.authorizeService.SignOut()
  }
}
