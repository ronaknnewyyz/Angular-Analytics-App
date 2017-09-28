import { TestBed, inject } from '@angular/core/testing';

import { DataService } from './data.service';
import { HttpModule } from '@angular/http';

describe('DataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpModule ],
      providers: [ DataService ]
    });
  });

  it('should be created', inject([DataService], (service: DataService) => {
    expect(service).toBeTruthy();
  }));

  it('should fetch Bar Data ramdonly', inject([DataService], (service: DataService) => {
    const data1 = service.getBarData();
    const data2 = service.getBarData();
    expect(data1[0][1]).not.toBe(data2[0][1]);
  }));
});
