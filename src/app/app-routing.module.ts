import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './users/login/login.component';
import { ComplaintComponent } from './users/complaint/complaint.component';
import { AuthGuardService } from './services/login-guard.service';

const routes: Routes = [{ path: '', redirectTo: '/login', pathMatch: 'full' },
 { path: 'login', component: LoginComponent },
 { path: 'complaint', component: ComplaintComponent,canActivate: [AuthGuardService]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuardService]
})
export class AppRoutingModule { }
