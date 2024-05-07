import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Card } from '../models/card';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards() {
    return this.http.get("http://localhost:9000/card");      
  }

  addCard(card: Card) {
    return this.http.post("http://localhost:9000/card", card)
  }

  updateCard(card: Card) {
    return this.http.put("http://localhost:9000/card", card);
  }

  deleteCard(cardId: number) {
    return this.http.delete(`http://localhost:9000/card/${cardId}`)
  }

  changeStatusCard(cardId: number, statusId: number){
    return this.http.post(`http://localhost:9000/card/changeStatus/${cardId}/${statusId}`, null);
  }

}
