import { TestBed } from '@angular/core/testing';

import { LogTimeOnTaskService } from './log-time-on-task.service';

describe('LogTimeOnTaskService', () => {
  let service: LogTimeOnTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LogTimeOnTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
