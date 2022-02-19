import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForoforComponent } from './components/forofor/forofor.component';
import { AuthGuard } from './guard/auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { PagesComponent } from './pages/pages.component';
import { PagesModule } from './pages/pages.module';
import { RegisterComponent } from './pages/register/register.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "login",
    pathMatch: 'full'
  },
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent,
  },

  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [{
      path: '',
      loadChildren: () => PagesModule
    }]
  },
  {
    path: '**', pathMatch: 'full',
    component: ForoforComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
