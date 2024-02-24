import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ApiResponse {
  status: string;
  message: string;
  data: any;
}

export interface PostMom {
  firstName: string;
  lastName: string;
  billsPayed: boolean;
  courses: string[];
  appointments: string[]; 
}

export interface Mom extends PostMom {
  id: string;
}

export interface PostCourse {
  name: string;
  moms: string[];
}

export interface Course {
  id: string;
  name: string;
  moms: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RestService {
  constructor(private http: HttpClient) {}

  backendUrl = environment.backendUrl;

  getMoms(): Observable<ApiResponse> {
    const url = `${this.backendUrl}/moms/`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.get<ApiResponse>(url, { headers });
  }

  getMom(id: string): Observable<ApiResponse> {
    const url = `${this.backendUrl}/moms/${id}`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.get<ApiResponse>(url, { headers });
  }

  deleteMom(id: string): Observable<ApiResponse> {
    const url = `${this.backendUrl}/moms/${id}`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.delete<ApiResponse>(url, { headers });
  }

  postMom(mom: PostMom): Observable<ApiResponse> {
    const url = `${this.backendUrl}/moms/`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');  
    return this.http.post<ApiResponse>(url, mom, { headers });  
  }

  putMom(id: string, mom: PostMom): Observable<ApiResponse> {
    const url = `${this.backendUrl}/moms/${id}`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');  
    return this.http.put<ApiResponse>(url, mom, { headers });  
  }

  getCourses(): Observable<ApiResponse> {
    const url = `${this.backendUrl}/courses/`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.get<ApiResponse>(url, { headers });
  }

  getCourse(id: string): Observable<ApiResponse> {
    const url = `${this.backendUrl}/courses/${id}`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');
    return this.http.get<ApiResponse>(url, { headers });
  }

  putCourse(id: string, course: PostCourse): Observable<ApiResponse> {
    const url = `${this.backendUrl}/courses/${id}`;
    const headers = new HttpHeaders()
      .set('accept', 'application/json')
      .set('Content-Type', 'application/json');  
    return this.http.put<ApiResponse>(url, course, { headers });  
  }
}
