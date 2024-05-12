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

  logs: Activity[] = [];
  displayedLogs: Activity[] = [];
  remainingLogs: Activity[] = [];
  showMoreButtonVisible = false;

  constructor(public dialogRef: MatDialogRef<HistoryModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: number,
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.loadLogsByBoardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLogsByBoardId(): void {
    this.activityService.getLogsByBoardId(this.data).subscribe({
      next: (data: any) => {
        this.logs = data;
        this.updateLogs();
      }
    });
  }

  loadMoreLogs(): void {
    this.displayedLogs.push(...this.remainingLogs);
    this.showMoreButtonVisible = false;
  }

  private updateLogs(): void {
    this.displayedLogs = this.logs.slice(0, 20);
    this.remainingLogs = this.logs.slice(20);
    this.showMoreButtonVisible = this.remainingLogs.length > 0;
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
