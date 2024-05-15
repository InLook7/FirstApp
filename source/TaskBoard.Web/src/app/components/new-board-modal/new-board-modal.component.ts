import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpClientModule } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Board } from '../../models/board';
import { BoardService } from '../../services/board.service';

@Component({
  selector: 'app-new-board-modal',
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
  templateUrl: './new-board-modal.component.html',
  styleUrl: './new-board-modal.component.scss'
})
export class NewBoardModalComponent {

  constructor(public dialogRef: MatDialogRef<NewBoardModalComponent>, 
    private boardService: BoardService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      let boardData: Omit<Board, 'id'> = { name: form.value.title };
      let board = new Board(boardData);
      
      this.boardService.addBoard(board).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
