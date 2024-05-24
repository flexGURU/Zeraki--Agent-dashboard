import { Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SchoolComponent } from './components/schools/schools.component';
import { AddSchoolComponent } from './components/add-school/add-school.component';
import { AddInvoiceComponent } from  './components/add-invoice/add-invoice.component'
import { AddCollectionComponent } from './components/add-collection/add-collection.component'
import { EditComponent } from './components/edit/edit.component'
import { EditInvoiceComponent } from './components/edit-invoice/edit-invoice.component'




export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schools', component: SchoolComponent },
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'addSchool', component: AddSchoolComponent },
  { path: 'addInvoice', component: AddInvoiceComponent  },
  { path: 'addCollection', component: AddCollectionComponent },
  { path: 'edit/:id', component: EditComponent},
  { path: 'edit-invoice/:id', component: EditInvoiceComponent},
 




];

export class AppRoutingModule { }
