import { TestBed } from '@angular/core/testing';

import { GlobalCommon } from './global.commons';

describe('GlobalCommons', () => {
  let service: GlobalCommon;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GlobalCommon);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
