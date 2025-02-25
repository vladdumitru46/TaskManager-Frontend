import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CreateProjectOrTaskPageComponent } from '../create/create-project-or-task-page/create-project-or-task-page.component';
import { Router, RouterModule } from '@angular/router';
import { UserService } from '../../service/user/user.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.css'
})
export class ToolbarComponent {

  constructor(private dialog: MatDialog, private router: Router, private userService: UserService) { }


  openCreatePage() {
    this.dialog.open(CreateProjectOrTaskPageComponent, {
      width: '400px'
    });
  }
  logout() {
    let token = localStorage.getItem("token");
    if (token) {
      this.removeUserSession(token);
      localStorage.removeItem("token");
      this.router.navigate(["/login"])
    }
  }

  removeUserSession(token: string) {
    this.userService.logout(token).subscribe({
      next: (response) => {
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

}
