import { Component, Inject } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../../models/board';
import { Store } from '@ngrx/store';
import { AppStateInterface } from '../../store/appState.interface';
import { updateBoard } from '../../store/actions/board.actions';

@Component({
  selector: 'app-edit-board-modal',
  standalone: true,
  providers: [
    BoardService
  ],
  imports: [
    HttpClientModule,
    FormsModule, 
    MatFormFieldModule, 
    MatInputModule,
  ],
  templateUrl: './edit-board-modal.component.html',
  styleUrl: './edit-board-modal.component.scss'
})
export class EditBoardModalComponent {

  constructor(public dialogRef: MatDialogRef<EditBoardModalComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: Board, 
    private store: Store<AppStateInterface>) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      let updatedBoard: Board = { id: this.data.id, name: form.value.title };
      
      this.store.dispatch(updateBoard({board: updatedBoard}));
      this.dialogRef.close(updatedBoard.id);
    }
  }

}
