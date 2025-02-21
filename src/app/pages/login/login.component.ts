import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../service/login/login.service';

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

  constructor(private loginService: LoginService,  private router: Router) { 
    this.checkAuth();
  }

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

  checkAuth() {
    const token = localStorage.getItem('token');
    if (token) {
      this.router.navigate(['/home']);
    }//TODO verify if token is expired
  }
}
