import { Component, ElementRef, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { RestService, PostAppointment, Appointment, Course } from '../../services/rest.service';
import { DataService } from '../../services/data.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  constructor(
    private router: Router,
    private restService: RestService,
    private dataService: DataService
  ) {}
  selectedDate?: any;
  dates: string[] = [];

  ngOnInit() {
    this.dataService.getAppointments().subscribe((res) => {res.forEach((appointment: any) => this.dates.push(appointment.date))})
    // this.restService.getAppointments().subscribe({
    //   next: (res) => {
    //     res.data.forEach((appointment: any) => this.dates.push(appointment.date));
    //   }
    // })
  }

  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {
      const highlightDate = this.dates
        .map((strDate) => new Date(strDate.replace(/(.*)\.(.*)\.(.*)/, '$3-$2-$1')))
        .some(
          (d) =>
            d.getDate() === date.getDate() &&
            d.getMonth() === date.getMonth() &&
            d.getFullYear() === date.getFullYear()
        );

      return highlightDate ? 'special-date' : '';
    };
  }

  onSelect() {
    let date = this.selectedDate
      .toLocaleString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
      .split(',')[0];
    let appointments: Appointment[];
    this.restService.getAppointmentsByDate(date).subscribe({
      next: (res) => {
        appointments = res.data;
      },
      complete: () => {
        if (appointments.length>0) {
          let data = {
            date: date,
            appointments: appointments
          };
          this.dataService.setData(data);
          this.router.navigate(['/appointments/'], { skipLocationChange: true });
        }
      }
    })
  }

  onAdd() {
    this.router.navigate(['/appointments/add/'], { skipLocationChange: true });
  }
}
