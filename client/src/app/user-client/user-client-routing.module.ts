import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AllPropertyComponent } from './all-property/all-property.component';
import { AllRendezVousComponent } from './all-rendez-vous/all-rendez-vous.component';
import { AddRDVComponent } from './add-rdv/add-rdv.component';
import { UpdateRdvComponent } from './update-rdv/update-rdv.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path:'AllProperty',component:AllPropertyComponent},
  {path:'AllRDV' , component:AllRendezVousComponent},
  {path:'AddRDV/:propertyId',component:AddRDVComponent},
  {path:'updateRDV/:rdvId',component:UpdateRdvComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserClientRoutingModule { }
