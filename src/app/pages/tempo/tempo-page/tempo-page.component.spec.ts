import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TempoPageComponent } from './tempo-page.component';

describe('TempoPageComponent', () => {
  let component: TempoPageComponent;
  let fixture: ComponentFixture<TempoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TempoPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TempoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
