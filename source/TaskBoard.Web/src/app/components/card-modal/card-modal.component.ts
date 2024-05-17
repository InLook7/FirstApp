import { Component, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { ActivityService } from '../../services/activity.service';
import { Card } from '../../models/card';
import { Activity } from '../../models/activity';
import { Observable, map } from 'rxjs';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { getActivitiesByCardId, resetActivities } from '../../store/actions/activity.actions';
import { activitiesSelector } from '../../store/selectors/activity.selectors';
import { statusesSelector } from '../../store/selectors/status.selectors';
import { Status } from '../../models/status';
import { getStatusByBId, getStatusesByBoardId } from '../../store/actions/status.actions';

@Component({
  selector: 'app-card-modal',
  standalone: true,
  providers: [
    StatusService,
    ActivityService
  ],
  imports: [
    HttpClientModule,
    CommonModule,
    MatIconModule
  ],
  templateUrl: './card-modal.component.html',
  styleUrl: './card-modal.component.scss'
})
export class CardModalComponent {
  
  logs$: Observable<Activity[]>;
  count: number = -1;
  showMoreButtonVisible = false;
  status: Observable<Status[]>;
  statusName: string;

  constructor(public dialogRef: MatDialogRef<CardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private store: Store<AppStateInterface>) {
      this.logs$ = this.store.pipe(select(activitiesSelector));
      this.status = this.store.pipe(select(statusesSelector));
    }

  ngOnInit(): void {
    this.store.dispatch(resetActivities());
    this.store.dispatch(getStatusesByBoardId({boardId: this.data.boardId}));
    this.status.pipe(map(status => status.find(status => status.id === this.data.statusId)?.name!)
    ).subscribe(statusName => {this.statusName = statusName });
    this.loadLastLogsByCardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLastLogsByCardId(): void {
    this.count += 1;
    this.store.dispatch(getActivitiesByCardId({cardId: this.data.id, count: this.count}));
    this.logs$.subscribe(logs => {
      if(logs.length == 20) {
        this.showMoreButtonVisible = true;
      }
      else {
        this.showMoreButtonVisible = false;
      }
    });
  }

  formatDetails(details: string): string {
    const regex = /(\/\/\/|%%%)(.*?)(\/\/\/|%%%)/g;
    
    const formattedDetails = details.replace(regex, (match, p1, p2) => {

      const tag = p1 === '\/\/\/' ? '⦿<b>' : '<ins>';
      return tag + p2 + (p1 === '\/\/\/' ? '</b>' : '</ins>');
    });
    
    return formattedDetails;
  }

}
