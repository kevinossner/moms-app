import { Component, ElementRef, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RestService } from '../../services/rest.service';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  constructor(
    private elem: ElementRef,
    private router: Router,
    private restService: RestService
  ) {}
  selectedDate?: any;
  dates: string[] = [];

  ngOnInit() {
    // this.restService.getAppointments().subscribe({
    //   next: (res) => {
    //     res.forEach((appointment) => this.dates.push(appointment.date));
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
    this.router.navigate(['/appointments/', date], { skipLocationChange: true });
  }

  onAdd() {
    let router = this.router;
    router.navigate(['/appointments/add/'], { skipLocationChange: true });
  }
}
