import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Status } from '../models/status';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  
  getStatusesByBoardId(boardId: number): Observable<Status[]> {
    return this.http.get<Status[]>(`http://localhost:9000/status/board/${boardId}`); 
  }

  getStatusById(statusId: number): Observable<Status> {
    return this.http.get<Status>(`http://localhost:9000/status/${statusId}`); 
  }

  addStatus(status: Status): Observable<Status> {
    return this.http.post<Status>("http://localhost:9000/status", status); 
  }

  updateStatus(status: Status): Observable<Status> {
    return this.http.put<Status>("http://localhost:9000/status", status);
  }

  deleteStatus(statusId: number) {
    return this.http.delete(`http://localhost:9000/status/${statusId}`)
  }

}
