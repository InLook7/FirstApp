import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCardModalComponent } from './new-card-modal.component';

describe('NewCardModalComponent', () => {
  let component: NewCardModalComponent;
  let fixture: ComponentFixture<NewCardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCardModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewCardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
