import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  RestService,
  PostAppointment,
  Course,
} from '../../services/rest.service';

@Component({
  selector: 'app-appointments-add',
  templateUrl: './appointments-add.component.html',
  styleUrls: ['./appointments-add.component.scss'],
})
export class AppointmentsAddComponent {
  constructor(
    private restService: RestService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  selectedCourse: string | undefined;
  courses: Course[] = [];

  ngOnInit(): void {
    this.restService.getCourses().subscribe({
      next: (res) => {
        this.courses = res;
      },
    });
  }

  selectedDate: string | undefined;
  appointment: PostAppointment | undefined;

  onSave(): void {
    if (this.selectedDate && this.selectedCourse) {
      this.appointment = {
        courseId: this.selectedCourse,
        date: new Date(this.selectedDate).toLocaleString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
      };
      this.restService.postAppointment(this.appointment).subscribe({
        complete: () => {
          this.router.navigate(['/calendar/'], { skipLocationChange: true });
          this.snackBar.open('Termin hinzugefügt!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    }
  }

  onBack(): void {
    this.router.navigate(['/calendar/'], { skipLocationChange: true });
  }
}