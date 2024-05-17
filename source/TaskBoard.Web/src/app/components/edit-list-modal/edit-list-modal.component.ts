import { Component, Inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { Status } from '../../models/status';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { updateStatus } from '../../store/actions/status.actions';

@Component({
  selector: 'app-edit-list-modal',
  standalone: true,
  providers: [
    StatusService
  ],
  imports: [
    HttpClientModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
  ],
  templateUrl: './edit-list-modal.component.html',
  styleUrl: './edit-list-modal.component.scss'
})
export class EditListModalComponent {

  constructor(public dialogRef: MatDialogRef<EditListModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Status, 
    private store: Store<AppStateInterface>,
    private statusService: StatusService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      let updatedStatus: Status = { id: this.data.id, name: form.value.title, boardId: this.data.boardId };
      
      this.store.dispatch(updateStatus({status: updatedStatus}));
      this.dialogRef.close();
    }
  }

}
