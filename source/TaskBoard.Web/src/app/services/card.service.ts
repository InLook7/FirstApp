import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../models/card';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards(): Observable<Card[]> {
    return this.http.get<Card[]>("http://localhost:9000/card");      
  }

  addCard(card: Card): Observable<Card> {
    return this.http.post<Card>("http://localhost:9000/card", card)
  }

  updateCard(card: Card): Observable<Card> {
    return this.http.put<Card>("http://localhost:9000/card", card);
  }

  deleteCard(cardId: number) {
    return this.http.delete(`http://localhost:9000/card/${cardId}`)
  }

  changeStatusCard(cardId: number, statusId: number){
    return this.http.post(`http://localhost:9000/card/changeStatus/${cardId}/${statusId}`, null);
  }

}
