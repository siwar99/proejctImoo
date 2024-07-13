                                                                                                                                                                import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { authGuard } from './services/guard/auth.guard';
import {ContratListComponent} from './contrat-list/contrat-list.component'
import { PropertyListComponent } from './properties-list/properties-list.component';
import { AddPropertyComponent } from './add-properties/add-properties.component';
import { UpdatePropertyComponent } from './update-properties/update-properties.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { ContratComponent } from './contrat/contrat.component'
import {ShowDetailsContratComponent} from './show-details-contrat/show-details-contrat.component'
import {UpdateContratComponent} from './update-contrat/update-contrat.component'
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { AllRDVComponent } from './all-rdv/all-rdv.component';


const routes: Routes = [
  {path:"show-all-properties",
  component: PropertyListComponent,
 
},
  {path:"show-all-contrats",component: ContratListComponent},
  {path:"add-properties", component: AddPropertyComponent},
  {path:"add-contrat", component: ContratComponent},
  {path:'updating-by-id/:id',component:UpdatePropertyComponent},
  {path:'updating-contrat-by-id/:id',component:UpdateContratComponent},
  {path:'details-of-properties/:id',component:ShowDetailsComponent},
  {path:'details-of-contrat/:id',component:ShowDetailsContratComponent},
  {path:'Host-RDVs',component:AllRDVComponent},
  {path:'home',component:HomeComponent},
  {
    path: '',
    component: HomeComponent,

    canActivate: [authGuard],
    data: { roles: ['ROLE_ADMIN'] },
  },
  {path:"contrat",component: ContratComponent},
 
  { 
    canActivate: [authGuard],
   data: { roles: ['ROLE_USER'] },
    path: 'user-client',
   loadChildren: () => import('./user-client/user-client.module').then(m => m.UserClientModule) ,
   
  },
  {
    path: 'unauthorized',
    component: UnauthorizedComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
