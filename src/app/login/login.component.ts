import { Component } from '@angular/core';
import { LoginService } from '../service/login/login.service';
import { CommonModule } from '@angular/common';  
import { routes } from '../app.routes';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']  
})
export class LoginComponent {
  email!: string;
  password!: string;

  constructor(private loginService: LoginService,  private router: Router) { }

  login(): void {
    this.loginService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login successful', response);
        localStorage.setItem("token", response);
        this.router.navigate(["/home"]);
      },
      error: (error) => {
        console.error('Login failed', error);
      }
    });
  }

  register() {
    this.router.navigate(["/register"]);
  }
}
