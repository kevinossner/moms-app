import { Component, OnInit } from '@angular/core';
import { PostCourse, RestService } from '../../services/rest.service';
import { Mom } from '../../services/rest.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mamas',
  templateUrl: './mamas.component.html',
  styleUrls: ['./mamas.component.scss'],
})
export class MamasComponent implements OnInit {
  constructor(
    private restService: RestService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  moms: Mom[] = [];
  selectedId: string | undefined;
  dialogRef: any;

  fetchMoms(): void {
    this.restService.getMoms().subscribe({
      next: (res) => {
        this.moms = res.data;
      },
      error: (error) => {
        this.moms = [];
      },
    });
  }

  ngOnInit(): void {
    this.fetchMoms();
  }

  openDialog(templateRef: any, id: string) {
    this.selectedId = id;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '300px',
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    if (this.selectedId) {
      let snackBar = this.snackBar;
      this.restService.deleteMom(this.selectedId).subscribe({
        complete: () => {
          this.fetchMoms();
          this.dialogRef.close();
          snackBar.open('Mama gelöscht!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
      let selectedMom = this.moms.find(mom => mom.id === this.selectedId)
      selectedMom?.courses.forEach((courseId) => {
        this.restService.getCourse(courseId).subscribe({
          next: (res) => {
            let updatedCourse: PostCourse = {
              name: res.data.name,
              moms: res.data.moms.filter((mom: string) => mom !== this.selectedId)
            };
            this.restService.putCourse(courseId, updatedCourse).subscribe();
          }
        })
      })
    }
  }

  onAdd(): void {
    this.router.navigate(['/mamas/add/'], { skipLocationChange: true });
  }

  onEdit(id: string) {
    this.router.navigate(['/mamas/edit/', id], { skipLocationChange: true });
  }
}
