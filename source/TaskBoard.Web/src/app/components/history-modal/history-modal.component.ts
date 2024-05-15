import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ActivityService } from '../../services/activity.service';
import { Activity } from '../../models/activity';

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

  count: number = -1;
  logs: Activity[] = [];
  showMoreButtonVisible = false;

  constructor(public dialogRef: MatDialogRef<HistoryModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: number,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadLastLogsByBoardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLastLogsByBoardId(): void {
    this.count += 1;
    this.activityService.getLastLogsByBoardId(this.data, this.count).subscribe({
      next: (data: Activity[]) => {
        this.logs.push(...data);

        if(data.length == 20) {
          this.showMoreButtonVisible = true;
        }
        else {
          this.showMoreButtonVisible = false;
        }
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
