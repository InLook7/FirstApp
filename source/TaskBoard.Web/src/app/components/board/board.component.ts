import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

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
import { Observable, map, switchMap, take } from 'rxjs';
import { getCards } from '../../store/actions/card.action';
import { Store, select } from '@ngrx/store';
import { selectCards } from '../../store/card.selector';

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

  currentBoard: Board;
  boards: Board[] = [];
  cards$: Observable<Card[]>;
  statuses: Status[] = [];
  statusCounts: { [statusId: number]: number } = {};

  constructor(private dialog: MatDialog, 
    private store: Store, 
    private boardService: BoardService,
    private cardService: CardService, 
    private statusService: StatusService, 
    private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.loadBoardList();
    this.loadCardList();
  }

  loadBoardList(boardId?: number): void {
    this.boardService.getBoards().subscribe({
      next: (data: any) => {
        this.boards = data;
        if (!this.currentBoard) {
          this.setBoard(this.boards[0].id);
        }
        else {
          this.setBoard(boardId);
        }
      }
    })
  }

  loadStatusList(): void {
    this.statusService.getStatusesByBoardId(this.currentBoard.id).subscribe({
      next: (data: any) => {
        this.statuses = data;
      }
    });

    this.loadCountCardsByStatuses();
  }

  loadCardList(): void  {
    this.store.dispatch(getCards());
    this.cards$ = this.store.pipe(select(selectCards));

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

  setBoard(boardId?: number) {
    if (boardId) {
      this.currentBoard = this.boards.find(b => b.id == boardId)!;
    }
    else {
      this.currentBoard = this.boards[this.boards.length - 1];
    }
    
    this.loadStatusList();
  }

  filterCards(statudId: number) {
    return this.cards$.pipe(
      map(cards => cards.filter(x => x.statusId == statudId))
    );
  }

  changeStatusCard(cardId: number, statusId: number): void {
    this.cardService.changeStatusCard(cardId, statusId).subscribe(() => {
      this.loadCardList();
    });
  }

  openNewBoardModal(): void {
    const dialogRef = this.dialog.open(NewBoardModalComponent, {
      width: '250px',
      height: '250px'
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadBoardList();
    });
  }

  openNewListModal(): void {
    const dialogRef = this.dialog.open(NewListModalComponent, {
      width: '250px',
      height: '250px',
      data: this.currentBoard
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadStatusList();
    });
  }

  openNewCardModal(): void {
    const dialogRef = this.dialog.open(NewCardModalComponent, {
      width: '610px',
      height: '610px',
      data: this.currentBoard
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadCardList();
    });
  }

  openEditBoardModal(): void {
    const dialogRef = this.dialog.open(EditBoardModalComponent, {
      width: '250px',
      height: '250px',
      data: this.currentBoard
    });

    dialogRef.afterClosed().subscribe(() => {
      this.loadBoardList(this.currentBoard.id);
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

  deleteBoard() {
    if (this.boards.length > 1) {
      this.boardService.deleteBoard(this.currentBoard.id).subscribe(() => {
        this.loadBoardList();
      })
    }
    else {
      console.log("Last board");
    }
  }

  deleteStatus(statusId: number) {
    this.statusService.deleteStatus(statusId).subscribe(() => {
      this.loadStatusList();
    });
  }

  deleteCard(cardId: number) {
    this.cardService.deleteCard(cardId).subscribe(() => {
      this.loadCardList();
    })
  }

  openCardModal(card: Card): void {
    this.dialog.open(CardModalComponent, {
      data: card
    });
  }

  openHistoryModal(): void {
    this.dialog.open(HistoryModalComponent, {
      data: this.currentBoard.id
    });
  }

}
