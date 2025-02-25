import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectNavigationBarComponent } from './project-navigation-bar.component';

describe('ProjectNavigationBarComponent', () => {
  let component: ProjectNavigationBarComponent;
  let fixture: ComponentFixture<ProjectNavigationBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectNavigationBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProjectNavigationBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
