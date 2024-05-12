import { Component, Inject } from '@angular/core';
import { BoardService } from '../../services/board.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, NgForm } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Board } from '../../models/board';

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
    private boardService: BoardService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onSave(form: NgForm): void {
    if (form.valid) {
      let board: Board = { id: this.data.id, name: form.value.title };
      
      this.boardService.updateBoard(board).subscribe(() =>{
        this.dialogRef.close();
      });
    }
  }

}
