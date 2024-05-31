import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Store, select } from '@ngrx/store';
import { Observable, map } from 'rxjs';

import { BoardService } from '../../services/board.service';
import { StatusService } from '../../services/status.service';
import { CardService } from '../../services/card.service';
import { AnalyticsService } from '../../services/analytics.service';
import { Board } from '../../models/board';
import { Status } from '../../models/status';
import { Card } from '../../models/card';
import { NewCardModalComponent } from '../new-card-modal/new-card-modal.component';
import { NewListModalComponent } from '../new-list-modal/new-list-modal.component';
import { EditListModalComponent } from '../edit-list-modal/edit-list-modal.component';
import { EditCardModalComponent } from '../edit-card-modal/edit-card-modal.component';
import { CardModalComponent } from '../card-modal/card-modal.component';
import { HistoryModalComponent } from '../history-modal/history-modal.component';
import { NewBoardModalComponent } from '../new-board-modal/new-board-modal.component';
import { EditBoardModalComponent } from '../edit-board-modal/edit-board-modal.component';
import { changeStatusCard, deleteCard, getCards } from '../../store/actions/card.actions';
import { cardsSelector } from '../../store/selectors/card.selectors';
import { AppStateInterface } from '../../store/appState.interface';
import { deleteStatus, getStatusesByBoardId } from '../../store/actions/status.actions';
import { statusesSelector } from '../../store/selectors/status.selectors';
import { boardSelector, boardsSelector, firstBoardSelector } from '../../store/selectors/board.selectors';
import { deleteBoard, getBoards } from '../../store/actions/board.actions';

@Component({
  selector: 'app-board',
  standalone: true,
  providers: [
    BoardService,
    StatusService,
    CardService,
    AnalyticsService
  ],
  imports: [
    FormsModule,
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

  cards$: Observable<Card[]>;
  statuses$: Observable<Status[]>;
  boards$: Observable<Board[]>;
  currentBoard$: Observable<Board | undefined>;
  statusCounts: { [statusId: number]: number } = {};

  constructor(private dialog: MatDialog, 
    private store: Store<AppStateInterface>,
    private analyticsService: AnalyticsService) {
      this.cards$ = this.store.pipe(select(cardsSelector));
      this.statuses$ = this.store.pipe(select(statusesSelector));
      this.boards$ = this.store.pipe(select(boardsSelector));
  }

  ngOnInit(): void {
    this.store.dispatch(getBoards());
    this.currentBoard$ = this.store.select(firstBoardSelector);
    this.loadCardList();
  }

  setBoard(boardId: number) {
    this.currentBoard$ = this.store.select(boardSelector(boardId));

    this.loadStatusList(boardId);
  }

  loadStatusList(boardId: number): void {
    this.store.dispatch(getStatusesByBoardId({boardId: boardId}));

    this.loadCountCardsByStatuses();
  }

  loadCardList(): void {
    this.store.dispatch(getCards());

    this.loadCountCardsByStatuses();
  }

  loadCardsByStatus(statudId: number) {
    return this.cards$.pipe(
      map(cards => cards.filter(x => x.statusId == statudId))
    );
  }

  changeStatusCard(cardId: number, statusId: number): void {
    this.store.dispatch(changeStatusCard({cardId: cardId, statusId: statusId}));
  }

  openNewBoardModal(): void {
    const dialogRef = this.dialog.open(NewBoardModalComponent, {
      width: '250px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe((boardId) => {
        this.setBoard(boardId);
    });
  }

  openNewListModal(): void {
    const dialogRef = this.dialog.open(NewListModalComponent, {
      width: '250px',
      height: '250px',
      data: this.currentBoard$
    });

    dialogRef.afterClosed().subscribe();
  }

  openNewCardModal(): void {
    const dialogRef = this.dialog.open(NewCardModalComponent, {
      width: '610px',
      height: '610px',
      data: this.currentBoard$
    });

    dialogRef.afterClosed().subscribe((statusId) => {
      this.loadCardsByStatus(statusId);
    });
  }

  openEditBoardModal(): void {
    const dialogRef = this.dialog.open(EditBoardModalComponent, {
      width: '250px',
      height: '250px',
      data: this.currentBoard$
    });

    dialogRef.afterClosed().subscribe((boardId) => {
        this.setBoard(boardId);
    });
  }

  openEditListModal(status: Status): void {
    const dialogRef = this.dialog.open(EditListModalComponent, {
      width: '250px',
      height: '250px',
      data: status
    });

    dialogRef.afterClosed().subscribe();
  }

  openEditCardModal(card: Card): void {
    const dialogRef = this.dialog.open(EditCardModalComponent, {
      width: '610px',
      height: '610px',
      data: card
    });

    dialogRef.afterClosed().subscribe();
  }

  deleteBoard(boardId: number) {
    this.store.dispatch(deleteBoard({ boardId }));
  }

  deleteStatus(statusId: number) {
    this.store.dispatch(deleteStatus({ statusId }));
  }

  deleteCard(cardId: number) {
    this.store.dispatch(deleteCard({ cardId }));
  }

  openCardModal(card: Card): void {
    this.dialog.open(CardModalComponent, {
      data: card
    });
  }

  openHistoryModal(boardId: number): void {
    this.dialog.open(HistoryModalComponent, {
      data: boardId
    });
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

}
