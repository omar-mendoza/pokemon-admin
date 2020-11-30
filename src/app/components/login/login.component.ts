import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: any;
  usuario = '';
  password = '';
  constructor(private loginService: LoginService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    
  }

}
