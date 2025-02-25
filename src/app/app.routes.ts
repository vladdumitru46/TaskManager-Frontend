import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomePageComponent } from './pages/homePage/home-page/home-page.component';
import { ProjectpageComponent } from './pages/projectPage/project-page/project-page.component';
import { TaskPageComponent } from './pages/taskPage/task-page/task-page.component';
import { KhabanTaskViewComponent } from './pages/projectPage/khaban-task-view/khaban-task-view.component';
import { TempoPageComponent } from './pages/tempo/tempo-page/tempo-page.component';

export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomePageComponent },
    { path: 'project/:name', component: ProjectpageComponent },
    { path: 'task/:uniqueName', component: TaskPageComponent },
    { path: 'khabanView/:name', component: KhabanTaskViewComponent },
    { path: 'tempo', component: TempoPageComponent },
    { path: '**', redirectTo: '', pathMatch: 'full' },
];
