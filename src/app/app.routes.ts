import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from '../pages/register/register.component';
import { HomePageComponent } from './homePage/home-page/home-page.component';
import { ProjectpageComponent } from './projectPage/project-page/project-page.component';
import { TaskPageComponent } from './taskPage/task-page/task-page.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'project/:name', component: ProjectpageComponent },
    { path: 'task/:uniqueName', component: TaskPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
