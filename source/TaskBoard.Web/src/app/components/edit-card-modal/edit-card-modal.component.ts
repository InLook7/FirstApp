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
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector } from '../../store/selectors/card.selectors';
import { updateCard } from '../../store/actions/card.actions';
import { getStatusesByBoardId } from '../../store/actions/status.actions';
import { statusesSelector } from '../../store/selectors/status.selectors';
import { prioritiesSelector } from '../../store/selectors/priority.selectors';
import { getPriorities } from '../../store/actions/priority.actions';

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

  statuses$: Observable<Status[]>;
  priorities$: Observable<Priority[]>;

  constructor(public dialogRef: MatDialogRef<EditCardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Card, 
    private store: Store<AppStateInterface>) {
      this.statuses$ = this.store.pipe(select(statusesSelector));
      this.priorities$ = this.store.pipe(select(prioritiesSelector));
    }

  ngOnInit(): void {
    this.store.dispatch(getStatusesByBoardId({boardId: this.data.boardId}));
    this.store.dispatch(getPriorities());
  }

  onClose(): void {
    this.dialogRef.close();
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
      let updatedCard = new Card(cardData);
      
      this.store.dispatch(updateCard({card: updatedCard}));
      this.dialogRef.close();
    }
  }

}
