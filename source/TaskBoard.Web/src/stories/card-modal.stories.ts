import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CardModalComponent } from '../app/components/card-modal/card-modal.component';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { CardService } from '../app/services/card.service';

const meta: Meta<CardModalComponent> = {
  title: 'CardModal',
  component: CardModalComponent,
  decorators: [
    moduleMetadata({
      imports: [
        HttpClientModule,
        CommonModule,
        MatIconModule
      ],
      providers: [ 
        CardService,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        { 
          provide: MAT_DIALOG_DATA, 
          useFactory: () => ({
            name: "TestCard",
            boardId: 1,
            statusId: 1,
            dueDate: new Date(),
            description: "Something secret",
            priorityId: 1,
            priorityName: "TestPriority",
            id: 100
          })
        }
      ]
    })
  ],
};

export default meta;
type Story = StoryObj<CardModalComponent>;

export const Default: Story = {};