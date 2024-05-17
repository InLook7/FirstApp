import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Board } from '../models/board';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private http: HttpClient) { }

  getBoards(): Observable<Board[]>{
    return this.http.get<Board[]>("http://localhost:9000/board");      
  }

  addBoard(board: Board): Observable<Board> {
    return this.http.post<Board>("http://localhost:9000/board", board); 
  }

  updateBoard(board: Board): Observable<Board> {
    return this.http.put<Board>("http://localhost:9000/board", board);
  }

  deleteBoard(boardId: number) {
    return this.http.delete(`http://localhost:9000/board/${boardId}`)
  }

}
