import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProjectOrTaskPageComponent } from './create-project-or-task-page.component';

describe('CreateProjectOrTaskPageComponent', () => {
  let component: CreateProjectOrTaskPageComponent;
  let fixture: ComponentFixture<CreateProjectOrTaskPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProjectOrTaskPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProjectOrTaskPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
