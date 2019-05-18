import { TestBed } from '@angular/core/testing';

import { JsonInputReaderService } from './json-input-reader.service';

describe('JsonInputReaderService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: JsonInputReaderService = TestBed.get(JsonInputReaderService);
    expect(service).toBeTruthy();
  });
});
