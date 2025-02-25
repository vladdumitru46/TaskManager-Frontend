import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KhabanTaskViewComponent } from './khaban-task-view.component';

describe('KhabanTaskViewComponent', () => {
  let component: KhabanTaskViewComponent;
  let fixture: ComponentFixture<KhabanTaskViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KhabanTaskViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(KhabanTaskViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
