export interface Trip {
  date?: string;
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

export type StatsData = {
  totalKms: number;
  totalDrivingTime: { nb: number; unit: "hrs" | "min" };
  tripsByRoadType: {
    countryside: number;
    expressway: number;
    highway: number;
    city: number;
  };
};
