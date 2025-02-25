import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../service/project/project.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-project-page',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-project-page.component.html',
  styleUrl: './create-project-page.component.css'
})
export class CreateProjectPageComponent {

  name: string = "";
  description: string = "";
  endDate!: Date;

  constructor(public dialogRef: MatDialogRef<CreateProjectPageComponent>, private projectService: ProjectService){}

  save() {
    this.projectService.addPoject(this.name, this.description, this.endDate).subscribe({
      next: (response) => {
        // this.userList = response;
      },
      error: (error) => {
        console.error(error);
      }
    });
    this.dialogRef.close();
    window.location.reload();
  }

  cancel() {
    this.dialogRef.close();
  }
}
