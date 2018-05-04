import { TestBed, inject } from '@angular/core/testing';

import { UrlInterceptorService } from './url-interceptor.service';

describe('UrlInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UrlInterceptorService]
    });
  });

  it('should be created', inject([UrlInterceptorService], (service: UrlInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
