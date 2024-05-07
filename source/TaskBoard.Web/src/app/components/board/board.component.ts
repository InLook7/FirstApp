import { Component } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { StatusService } from '../../services/status.service';
import { CardService } from '../../services/card.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Status } from '../../models/status';
import { Card } from '../../models/card';
import { NewCardModalComponent } from '../new-card-modal/new-card-modal.component';
import { NewListModalComponent } from '../new-list-modal/new-list-modal.component';
import { EditListModalComponent } from '../edit-list-modal/edit-list-modal.component';
import { EditCardModalComponent } from '../edit-card-modal/edit-card-modal.component';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { HistoryModalComponent } from '../history-modal/history-modal.component';

@Component({
  selector: 'app-board',
  standalone: true,
  providers: [
    StatusService,
    CardService,
    AnalyticsService
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatMenuModule,
    MatListModule,
    MatIconModule
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss'
})
export class BoardComponent {

  cards: Card[] = [];
  statuses: Status[] = [];
  statusCounts: { [statusId: number]: number } = {};

  constructor(private dialog: MatDialog, 
    private cardService: CardService, 
    private statusService: StatusService, 
    private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadStatusList();
    this.loadCardList();
  }

  loadStatusList(): void {
    this.statusService.getStatuses().subscribe({
      next: (data: any) => {
        this.statuses = data;
      }
    });

    this.loadCountCardsByStatuses();
  }

  loadCardList(): void  {
    this.cardService.getCards().subscribe({
      next: (data: any) => {
        this.cards = data;
      }
    });

    this.loadCountCardsByStatuses();
  }

  loadCountCardsByStatuses(): void {
    this.analyticsService.getCountCardsByStatuses().subscribe({
      next: (data: any) => {
        data.forEach((statusCount: any) => {
          this.statusCounts[statusCount.statusId] = statusCount.countCards;
        });
      }
    })
  }

  deleteCard(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(() => {
      this.loadCardList();
    })
  }

  deleteStatus(statusId: number) {
    this.statusService.deleteStatus(statusId).subscribe(() => {
      this.loadStatusList();
    });
  }

  filterCards(statudId: number) {
    return this.cards.filter(x => x.statusId == statudId);
  }

  onSelected(cardId: number, statusId: number): void {
    this.cardService.changeStatusCard(cardId, statusId).subscribe(() => {
      this.loadCardList();
    });
  }

  openCardModal(card: Card): void {
    this.dialog.open(CardModalComponent, {
      data: card
    });
  }

  openNewCardModal(): void {
    const dialogRef = this.dialog.open(NewCardModalComponent, {
      width: '610px',
      height: '610px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCardList();
    });
  }

  openEditCardModal(card: Card): void {
    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '610px',
      height: '610px',
      data: card
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCardList();
    });
  }

  openNewListModal(): void {
    const dialogRef = this.dialog.open(NewListModalComponent, {
      width: '250px',
      height: '250px',
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStatusList();
    });
  }

  openEditListModal(status: Status): void {
    const dialogRef = this.dialog.open(EditListModalComponent, {
      width: '250px',
      height: '250px',
      data: status
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStatusList();
    });
  }

  openHistoryModal(): void {
    this.dialog.open(HistoryModalComponent);
  }

}
