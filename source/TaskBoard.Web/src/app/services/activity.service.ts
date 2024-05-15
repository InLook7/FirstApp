import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Activity } from '../models/activity';

@Injectable({
  providedIn: 'root'
})
export class ActivityService {

  constructor(private http: HttpClient) { }

  getLastLogsByBoardId(boardId: number, count: number) {
    return this.http.get<Activity[]>(`http://localhost:9000/activity/board/${boardId}/${count}`);      
  }

  getLastLogsByCardId(cardId: number, count: number) {
    return this.http.get<Activity[]>(`http://localhost:9000/activity/card/${cardId}/${count}`);  
  }
}
