import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { Observable } from 'rxjs';
import { activitiesSelector } from '../../store/selectors/activity.selectors';
import { getActivitiesByBoardId, resetActivities } from '../../store/actions/activity.actions';

@Component({
  selector: 'app-history-modal',
  standalone: true,
  providers: [
    ActivityService
  ],
  imports: [
    CommonModule, 
    HttpClientModule,
    MatIconModule
  ],
  templateUrl: './history-modal.component.html',
  styleUrl: './history-modal.component.scss'
})
export class HistoryModalComponent {

  logs$: Observable<Activity[]>;
  count: number = -1;
  showMoreButtonVisible = false;

  constructor(public dialogRef: MatDialogRef<HistoryModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: number,
    private store: Store<AppStateInterface>) {
      this.logs$ = this.store.pipe(select(activitiesSelector));
    }

  ngOnInit(): void {
    this.store.dispatch(resetActivities());
    this.loadLastLogsByBoardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLastLogsByBoardId(): void {
    this.count += 1;
    this.store.dispatch(getActivitiesByBoardId({boardId: this.data, count: this.count}));
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
