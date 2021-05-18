import { TestBed } from '@angular/core/testing';

import { CaptchatokenService } from './captchatoken.service';

describe('CaptchatokenService', () => {
  let service: CaptchatokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CaptchatokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
