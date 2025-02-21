import { Component } from '@angular/core';
import { RegisterService } from '../../app/service/register/register.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  name!: string;
  username!: string;
  email!: string;
  password!: string;
  retypePassword!: string;

  constructor(private registerService: RegisterService, private router: Router) { }

  register() {

    console.log(this.name)

    if (this.password === this.retypePassword) {

      this.registerService.regitser(this.name, this.username, this.email, this.password).subscribe({
        next: (response) => {
            this.router.navigate(["/login"]);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }else{
        console.log("Passwords do not match")
    }
  }

}
