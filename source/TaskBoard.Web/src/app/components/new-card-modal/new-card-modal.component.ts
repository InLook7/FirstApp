import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { CardService } from '../../services/card.service';
import { PriorityService } from '../../services/priority.service';
import { Status } from '../../models/status';
import { Card } from '../../models/card';
import { Priority } from '../../models/priority';

@Component({
  selector: 'app-new-card-modal',
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
  templateUrl: './new-card-modal.component.html',
  styleUrl: './new-card-modal.component.scss'
})
export class NewCardModalComponent {

  statuses: Status[] = [];
  priorities: Priority[] = [];

  constructor(public dialogRef: MatDialogRef<NewCardModalComponent>, 
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
    this.statusService.getStatuses().subscribe({
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

  onCreate(form: NgForm): void {
    if (form.valid) {
      let cardData: Omit<Card, 'id' | 'priorityName'> = { 
        name: form.value.title,
        priorityId: form.value.priority,
        dueDate: form.value.date,
        description: form.value.description,
        statusId: form.value.status
      };
      let card = new Card(cardData);

      this.cardService.addCard(card).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
