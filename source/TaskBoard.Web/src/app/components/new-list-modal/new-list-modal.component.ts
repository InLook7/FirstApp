import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { StatusService } from '../../services/status.service';
import { Status } from '../../models/status';

@Component({
  selector: 'app-new-list-modal',
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
  templateUrl: './new-list-modal.component.html',
  styleUrl: './new-list-modal.component.scss'
})
export class NewListModalComponent {

  constructor(public dialogRef: MatDialogRef<NewListModalComponent>, 
    private statusService: StatusService) { }

  ngOnInit(): void {
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onCreate(form: NgForm): void {
    if (form.valid) {
      let statusData: Omit<Status, 'id'> = { name: form.value.title };
      let status = new Status(statusData);
      
      this.statusService.addStatus(status).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

}
