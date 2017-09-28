import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { ILineData, IBarData, ILineEventData } from './data.interface';

const weekday = new Array(7);
weekday[2] =  'Sunday';
weekday[3] = 'Monday';
weekday[4] = 'Tuesday';
weekday[5] = 'Wednesday';
weekday[6] = 'Thursday';
weekday[0] = 'Friday';
weekday[1] = 'Saturday';

@Injectable()
export class DataService {

  private lineDataURL = 'api/lineData';
  private barDataURL = 'api/eventsCount';

  constructor(private http: Http) { }

  getLineData(condition: string): Observable<number[]> {
    const line = [];
    return this.fetchLineData()
      .map((lineData) => {
        const data: ILineEventData[] = lineData[condition];
        for (let i = 0; i < data.length; i++) {
          line.push([
            weekday[new Date(data[i].date).getDay()],
            data[i].value
          ]);
        }
        return line;
      });
  }

  fetchLineData(): Observable<ILineData> {
    return this.http.get(this.lineDataURL)
      .map(response => response.json().data as ILineData);
  }

  getBarData(): any {
    const chartData = [];

    for (let i = 0; i < (1 + Math.floor(Math.random() * 20)); i++) {
      chartData.push([
        `Event ${i}`,
        Math.floor(Math.random() * 10)
      ]);
    }
    // for (let i = 0; i < eventsCount.length; i++) {
    //   chartData.push([
    //     eventsCount[i].name,
    //     eventsCount[i].count
    //   ]);
    // }
    return chartData;
  }
}
