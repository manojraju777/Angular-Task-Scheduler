import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {

  baseUrl = 'http://localhost:3000/v1'
  userId = 1

  constructor(private http: HttpClient) { }

  createTask(url, task) {
    return this.http.post(`${this.baseUrl}/${url}`, task)
      .pipe(
        catchError(this.handleError)
      );
  }

  getTasks(url) {
    return this.http.get(`${this.baseUrl}/${url}/${this.userId}`)
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  };
}
