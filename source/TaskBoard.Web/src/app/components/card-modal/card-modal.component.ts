import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { ActivityService } from '../../services/activity.service';
import { Card } from '../../models/card';
import { Activity } from '../../models/activity';

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
  
  logs: Activity[] = [];
  displayedLogs: Activity[] = [];
  remainingLogs: Activity[] = [];
  showMoreButtonVisible = false;
  statusName: string;

  constructor(public dialogRef: MatDialogRef<CardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private statusService: StatusService, 
    private activityService: ActivityService) { }


  ngOnInit(): void {
    this.getStatusById();
    this.loadLogsByCardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLogsByCardId(): void {
    this.activityService.getLogsByCardId(this.data.id).subscribe({
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

  getStatusById() {
    this.statusService.getStatusById(this.data.statusId).subscribe({
      next: (data: any) => {
        this.statusName = data.name;
      }
    })
  }
  
}
