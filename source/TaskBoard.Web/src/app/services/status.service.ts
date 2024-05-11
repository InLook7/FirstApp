import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Status } from '../models/status';

@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }
  
  getStatuses() {
    return this.http.get("http://localhost:9000/status");      
  }

  getStatusById(statusId: number) {
    return this.http.get(`http://localhost:9000/status/${statusId}`); 
  }

  getStatusesByBoardId(boardId: number) {
    return this.http.get(`http://localhost:9000/status/board/${boardId}`); 
  }

  addStatus(status: Status) {
    return this.http.post("http://localhost:9000/status", status); 
  }

  updateStatus(status: Status) {
    return this.http.put("http://localhost:9000/status", status);
  }

  deleteStatus(statusId: number) {
    return this.http.delete(`http://localhost:9000/status/${statusId}`)
  }

}
