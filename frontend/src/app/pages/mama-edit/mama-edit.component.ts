import { Component, OnInit } from '@angular/core';
import { RestService, PostMom, Course, PostCourse } from '../../services/rest.service';
import { DataService } from '../../services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mama-edit',
  templateUrl: './mama-edit.component.html',
  styleUrls: ['./mama-edit.component.scss']
})
export class MamaEditComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  momId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  billsPayed: boolean | undefined;
  attendance: number | undefined;
  initialCourses: string[] = [];
  selectedCourses: string[] = [];
  allCourses: Course[] = [];


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.momId = params["id"]
      this.dataService.getMom(this.momId!).subscribe({
        next: (res) => {
          this.firstName = res.firstName;
          this.lastName = res.lastName;
          this.billsPayed = res.billsPayed;
          this.initialCourses = res.courses;
          this.selectedCourses = res.courses;
          this.attendance = res.attendance;
        }        
      })
    })
    this.dataService.getCourses().subscribe((res) => {this.allCourses = res})
  }

  onSave(): void {
    const coursesToDelete = this.initialCourses.filter(course => !this.selectedCourses.includes(course));
    const coursesToAdd = this.selectedCourses.filter(course => !this.initialCourses.includes(course));
    let mom: PostMom = {
      firstName: this.firstName!,
      lastName: this.lastName!,
      billsPayed: this.billsPayed!,
      courses: this.selectedCourses,
      attendance: this.attendance!
    }
    this.dataService.putMom(this.momId!, mom).then(() => {
      this.router.navigate(['/mamas/'], { skipLocationChange: true });
      this.snackBar.open('Mama bearbeited!', 'Ausblenden', {
        duration: 3 * 1000,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      });
      coursesToDelete.forEach((courseId) => {
        let course = this.allCourses.find((course: Course) => course.id === courseId)
        let updatedCourse: PostCourse = {
          name: course!.name,
          moms: course!.moms.filter((mom: string) => mom !== this.momId)
        }
        this.dataService.putCourse(courseId, updatedCourse)
      });
      coursesToAdd.forEach((courseId) => {
        let course = this.allCourses.find((course: Course) => course.id === courseId)
        let updatedCourse: PostCourse = {
          name: course!.name,
          moms: [...course!.moms, this.momId!]
        }
        this.dataService.putCourse(courseId, updatedCourse)
      })        
    })
  }

  onBack(): void {
    this.router.navigate(['/mamas/'], { skipLocationChange: true });
  }
}
