import { InMemoryDbService } from 'angular-in-memory-web-api';
import { ILineData, IBarData } from './data.interface';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const eventsCount: IBarData[] = [
      {name: 'Email PDFs', count: 4165},
      {name: 'Enter VIN View', count: 96251},
      {name: 'Factory Scheduled Maintenance Guide PDF', count: 3631},
      {name: 'Open TireWorks Frame', count: 1189},
      {name: 'Push Repair Order', count: 84165},
      {name: 'Queue Sort', count: 3281},
      {name: 'Remove Vehicle from Queue', count: 23443},
      {name: 'Toggle Pin Vehicle Queue', count: 4702},
      {name: 'VIP Document PDF', count: 14315},
      {name: 'Welcome Tab', count: 4710},
      {name: 'wiAdvisor Tools Link', count: 8881},
      {name: 'Write Up Document PDF', count: 15212}
    ];

    const lineData: ILineData = {
      pushRO: [
        {date: new Date(2017, 9, 17), value: 323},
        {date: new Date(2017, 9, 18), value: 41739},
        {date: new Date(2017, 9, 19), value: 37963},
        {date: new Date(2017, 9, 20), value: 37412},
        {date: new Date(2017, 9, 21), value: 37383},
        {date: new Date(2017, 9, 22), value: 37858},
        {date: new Date(2017, 9, 23), value: 22456}
      ],
      enterRO: [
        {date: new Date(2017, 9, 17), value: 2427},
        {date: new Date(2017, 9, 18), value: 72644},
        {date: new Date(2017, 9, 19), value: 47867},
        {date: new Date(2017, 9, 20), value: 47266},
        {date: new Date(2017, 9, 21), value: 48335},
        {date: new Date(2017, 9, 22), value: 47088},
        {date: new Date(2017, 9, 23), value: 27294}
      ]
    };

    return {eventsCount, lineData};
    }

}
