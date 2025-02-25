import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CreateProjectPageComponent } from '../create-project-page/create-project-page.component';
import { CreateTaskPageComponent } from '../create-task-page/create-task-page.component';

@Component({
  selector: 'app-create-project-or-task-page',
  standalone: true,
  imports: [],
  templateUrl: './create-project-or-task-page.component.html',
  styleUrl: './create-project-or-task-page.component.css'
})
export class CreateProjectOrTaskPageComponent {




  constructor(private dialog: MatDialog, public dialogRef: MatDialogRef<CreateProjectOrTaskPageComponent>) { }

  addTask() {
    this.dialog.open(CreateTaskPageComponent, {
      width: '400px'
    });

    this.dialogRef.close();
  }
  addProject() {
    this.dialog.open(CreateProjectPageComponent, {
      width: '400px'
    });

    this.dialogRef.close();
  }

  close() {
    this.dialogRef.close();
  }

}
