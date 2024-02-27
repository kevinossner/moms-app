import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
  RestService,
  PostAppointment,
  Course,
} from '../../services/rest.service';
import { DataService } from "../../services/data.service";

@Component({
  selector: 'app-appointments-add',
  templateUrl: './appointments-add.component.html',
  styleUrls: ['./appointments-add.component.scss'],
})
export class AppointmentsAddComponent {
  constructor(
    private restService: RestService,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  selectedCourse: string | undefined;
  courses: Course[] = [];
  selectedDate: string | undefined;

  ngOnInit(): void {
    this.dataService.getCourses().subscribe((courses) => {this.courses = courses});
  }

  onSave(): void {
    if (this.selectedDate && this.selectedCourse) {
      let appointment: PostAppointment = {
        courseId: this.selectedCourse,
        date: new Date(this.selectedDate).toLocaleString('de-DE', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric',
        }),
        momsAttended: []
      };
      this.dataService.postAppointment(appointment).then((createdAppointment) => {
        this.router.navigate(['/calendar/'], { skipLocationChange: true });
        this.snackBar.open('Termin hinzugefügt!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });       
      })  
    }
  }

  onBack(): void {
    this.router.navigate(['/calendar/'], { skipLocationChange: true });
  }
}
