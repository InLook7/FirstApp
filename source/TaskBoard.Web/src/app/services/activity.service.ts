import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getLogs() {
    return this.http.get("http://localhost:9000/activity");      
  }

  getLogsByCardId(cardId: number) {
    return this.http.get(`http://localhost:9000/activity/${cardId}`);  
  }
}
