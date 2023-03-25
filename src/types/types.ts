export interface ShortTrip {
  date: string;
  from: string;
  to: string;
  length: number;
  duration: number;
  roundTrip: boolean;
  key: string;
  onClick?: CallableFunction;
}

export interface FullTrip {
  date: string;
  time: string;
  roadType: string;
  trafficDensity: string;
  weather: string;
  from: string;
  to: string;
  length: number;
  duration: number;
  roundTrip: boolean;
  uid: string;
}
