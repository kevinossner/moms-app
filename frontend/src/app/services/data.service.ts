import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, docData, orderBy, query, where, doc } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BaseMom {
  firstName: string;
  lastName: string;
  billsPayed: boolean;
  courses: string[];
  attendance: number; 
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  firestore: Firestore = inject(Firestore)
  
  constructor(
    private store: Firestore
  ) {}

  private data: any;

  setData(data: any) {
    this.data = data;
  }

  getData() {
    return this.data;
  }

  getMoms(): Observable<any[]> {
    const aCollection = collection(this.firestore, 'moms');
    const orderedQuery = query(aCollection, orderBy('firstName'));
    return collectionData(orderedQuery, { idField: 'id' })
  }

  getMom(id: string): Observable<any> {
    const aCollection = doc(this.firestore, `moms/${id}`);
    return docData(aCollection, { idField: 'id' })
  }

  getAppointments(): Observable<any[]> {
    const aCollection = collection(this.firestore, 'appointments');
    return collectionData(aCollection, { idField: 'id' })
  }

  getCourses(): Observable<any[]> {
    const aCollection = collection(this.firestore, 'courses');
    return collectionData(aCollection, { idField: 'id' })
  }

}
