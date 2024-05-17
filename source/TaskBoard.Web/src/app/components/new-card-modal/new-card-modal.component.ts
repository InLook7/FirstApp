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
import { Board } from '../../models/board';
import { Store, select } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { Observable } from 'rxjs';
import { errorSelector, isLoadingSelector } from '../../store/selectors/card.selectors';
import { createCard } from '../../store/actions/card.actions';
import { getStatusesByBoardId } from '../../store/actions/status.actions';
import { statusesSelector } from '../../store/selectors/status.selectors';
import { getPriorities } from '../../store/actions/priority.actions';
import { prioritiesSelector } from '../../store/selectors/priority.selectors';

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

  statuses$: Observable<Status[]>;
  priorities$: Observable<Priority[]>;

  constructor(public dialogRef: MatDialogRef<NewCardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Board, 
    private store: Store<AppStateInterface>) {
      this.statuses$ = this.store.pipe(select(statusesSelector));
      this.priorities$ = this.store.pipe(select(prioritiesSelector));
    }

  ngOnInit(): void {
    this.store.dispatch(getStatusesByBoardId({boardId: this.data.id}));
    this.store.dispatch(getPriorities());
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      let cardData: Omit<Card, 'id' | 'priorityName'> = { 
        boardId: this.data.id,
        name: form.value.title,
        priorityId: form.value.priority,
        dueDate: form.value.date,
        description: form.value.description,
        statusId: form.value.status
      };
      let newCard = new Card(cardData);

      this.store.dispatch(createCard({card: newCard}));
      this.dialogRef.close(newCard.statusId);
    }
  }

}
