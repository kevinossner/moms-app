import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MamasComponent } from './pages/mamas/mamas.component';
import { CalendarComponent } from './pages/calendar/calendar.component';
import { HomeComponent } from './pages/home/home.component';
import { MamaAddComponent } from './pages/mama-add/mama-add.component';
import { MamaEditComponent } from './pages/mama-edit/mama-edit.component';
import { AppointmentsComponent } from './pages/appointments/appointments.component';
import { AppointmentsAddComponent } from './pages/appointments-add/appointments-add.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'mamas', component: MamasComponent },
  { path: 'mamas/add', component: MamaAddComponent },
  { path: 'mamas/edit/:id', component: MamaEditComponent },
  { path: 'calendar', component: CalendarComponent },
  { path: 'appointments', component: AppointmentsComponent },
  { path: 'appointments/add', component: AppointmentsAddComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
