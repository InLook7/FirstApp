import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Priority } from '../models/priority';

@Injectable({
  providedIn: 'root'
})
export class PriorityService {

  constructor(private http: HttpClient) { }

  getPriorities(): Observable<Priority[]> {
    return this.http.get<Priority[]>("http://localhost:9000/priority");      
  }

}
