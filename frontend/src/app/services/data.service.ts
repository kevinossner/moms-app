import { Injectable } from '@angular/core';
import { Component, inject } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  docData,
  orderBy,
  query,
  where,
  doc,
  deleteDoc,
  updateDoc,
  addDoc
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

export interface BaseMom {
  firstName: string;
  lastName: string;
  billsPayed: boolean;
  courses: string[];
  attendance: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataService {
  firestore: Firestore = inject(Firestore);

  constructor(private store: Firestore) {}

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
    return collectionData(orderedQuery, { idField: 'id' });
  }

  getMom(id: string): Observable<any> {
    const aCollection = doc(this.firestore, `moms/${id}`);
    return docData(aCollection, { idField: 'id' });
  }

  putMom(id: string, data: any): Promise<any> {
    const aCollection = doc(this.firestore, `moms/${id}`);
    return updateDoc(aCollection, data)
  }

  postMom(data: any): Promise<any> {
    const aCollection = collection(this.firestore, 'moms');
    return addDoc(aCollection, data)
  }

  deleteMom(id: string): Promise<any> {
    const aCollection = doc(this.firestore, `moms/${id}`);
    return deleteDoc(aCollection)
  }

  getAppointments(): Observable<any[]> {
    const aCollection = collection(this.firestore, 'appointments');
    return collectionData(aCollection, { idField: 'id' });
  }

  getAppointmentsByDate(date: string): Observable<any[]> {
    const aCollection = collection(this.firestore, 'appointments');
    const filteredQuery = query(aCollection, where("date", "==", date));
    return collectionData(filteredQuery, { idField: 'id' });
  }

  postAppointment(data: any): Promise<any> {
    const aCollection = collection(this.firestore, 'appointments');
    return addDoc(aCollection, data)
  }

  putAppointment(id: string, data: any): Promise<any> {
    const aCollection = doc(this.firestore, `appointments/${id}`);
    return updateDoc(aCollection, data)
  }

  getCourses(): Observable<any[]> {
    const aCollection = collection(this.firestore, 'courses');
    return collectionData(aCollection, { idField: 'id' });
  }

  getCourse(id: string): Observable<any> {
    const aCollection = doc(this.firestore, `courses/${id}`);
    return docData(aCollection, { idField: 'id' });
  }

  putCourse(id: string, data: any): Promise<any> {
    const aCollection = doc(this.firestore, `courses/${id}`);
    return updateDoc(aCollection, data)
  }
}
