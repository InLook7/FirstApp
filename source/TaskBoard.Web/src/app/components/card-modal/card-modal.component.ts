import { Component, Inject, Input } from '@angular/core';
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
  
  count: number = -1;
  logs: Activity[] = [];
  showMoreButtonVisible = false;
  statusName: string;

  constructor(public dialogRef: MatDialogRef<CardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Card,
    private statusService: StatusService, 
    private activityService: ActivityService) { }

  ngOnInit(): void {
    this.getStatusById();
    this.loadLastLogsByCardId();
  }

  onClose(): void {
    this.dialogRef.close();
  }

  loadLastLogsByCardId(): void {
    this.count += 1;
    this.activityService.getLastLogsByCardId(this.data.id, this.count).subscribe({
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

  getStatusById() {
    this.statusService.getStatusById(this.data.statusId).subscribe({
      next: (data: any) => {
        this.statusName = data.name;
      }
    })
  }
  
}
