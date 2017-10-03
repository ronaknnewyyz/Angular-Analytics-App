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

  it('should fetch Bar Data ramdonly within range', inject([DataService], (service: DataService) => {
    const data1 = service.getBarData();
    const data2 = service.getBarData();
    expect(data1[0][1]).toBeLessThan(11);
    expect(data2[0][1]).toBeGreaterThanOrEqual(0);
  }));

  it('should fetch Line Data to be true', inject([DataService], (service: DataService) => {
    const data1 = service.getLineData('pushRO');
    const data2 = service.getLineData('enterRO');
    expect(data1[0]).not.toBeNull();
    expect(data2[0]).not.toBeNull();
  }));

  it('should fetch Line Data with condition', inject([DataService], (service: DataService) => {
    const data1 = service.getLineData('sortRO');
    expect(data1[0]).not.toBeDefined();
  }));
});
