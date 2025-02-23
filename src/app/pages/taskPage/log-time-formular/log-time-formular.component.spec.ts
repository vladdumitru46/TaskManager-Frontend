import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTimeFormularComponent } from './log-time-formular.component';

describe('LogTimeFormularComponent', () => {
  let component: LogTimeFormularComponent;
  let fixture: ComponentFixture<LogTimeFormularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogTimeFormularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogTimeFormularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
