import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getCountCardsByStatuses(): Observable<{ [statusId: number]: number }> {
    return this.http.get<{ [statusId: number]: number }>("http://localhost:9000/analytics/");      
  }
}
