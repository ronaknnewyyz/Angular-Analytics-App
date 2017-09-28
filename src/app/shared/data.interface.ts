export interface ILineData {
  pushRO: ILineEventData[];
  enterRO: ILineEventData[];
}

export interface ILineEventData {
  date: Date;
  value: number;
}

export interface ILineEventName {
  event: string;
  name: string;
}

export interface IBarData {
  name: string;
  count: number;
}
