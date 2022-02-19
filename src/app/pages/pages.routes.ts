import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManageUsersComponent } from './manage-users/manage-users.component';
import { ProfileComponent } from './profile/profile.component';
import { SettingComponent } from './setting/setting.component';

const routes: Routes = [
  {
    path: "",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "dashboard",
    redirectTo: "home",
    pathMatch: 'full'
  },
  {
    path: "setting",
    component: SettingComponent,
  },
  {
    path: "manageUser",
    component: ManageUsersComponent
  },
  {
    path: "profile",
    component: ProfileComponent
  },
  {
    path: "home",
    component: HomeComponent
  }

];
export default routes;
