import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  getCountCardsByStatuses() {
    return this.http.get("http://localhost:9000/analytics/");      
  }
}
