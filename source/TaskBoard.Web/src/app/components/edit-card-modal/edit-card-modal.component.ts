import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { CardService } from '../../services/card.service';
import { PriorityService } from '../../services/priority.service';
import { Status } from '../../models/status';
import { Priority } from '../../models/priority';
import { Card } from '../../models/card';

@Component({
  selector: 'app-edit-card-modal',
  standalone: true,
  providers: [
    CardService,
    StatusService,
    PriorityService
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule
  ],
  templateUrl: './edit-card-modal.component.html',
  styleUrl: './edit-card-modal.component.scss'
})
export class EditCardModalComponent {

  statuses: Status[] = [];
  priorities: Priority[] = [];

  constructor(public dialogRef: MatDialogRef<EditCardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Card, 
    private statusService: StatusService, 
    private priorityService: PriorityService,
    private cardService: CardService) { }

  ngOnInit(): void {
    this.loadStatusList();
    this.loadPriorityList();
  }

  onClose(): void {
    this.dialogRef.close();
  }
  
  loadStatusList(): void {
    this.statusService.getStatusesByBoardId(this.data.boardId).subscribe({
      next: (data: any) => {
        this.statuses = data;
      }
    });
  }

  loadPriorityList(): void {
    this.priorityService.getPriorities().subscribe({
      next: (data: any) => {
        this.priorities = data;
      }
    });
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      let cardData: Omit<Card, 'priorityName'> = {
        id: this.data.id,
        boardId: this.data.boardId, 
        name: form.value.title,
        priorityId: form.value.priority,
        dueDate: form.value.date,
        description: form.value.description,
        statusId: form.value.status
      };
      let card = new Card(cardData);
      
      this.cardService.updateCard(card).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
