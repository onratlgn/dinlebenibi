import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingRegisterComponent } from './training-register.component';

describe('TrainingRegisterComponent', () => {
  let component: TrainingRegisterComponent;
  let fixture: ComponentFixture<TrainingRegisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrainingRegisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrainingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
