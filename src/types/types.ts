export interface Trip {
  date?: string | { seconds: number; nanoseconds: number };
  duration: number;
  from?: string;
  id?: string;
  key?: number;
  length: number;
  roadType?: string;
  roundTrip?: boolean;
  time?: string;
  to?: string;
  trafficDensity?: string;
  weather?: string;
  uid?: string;
}
