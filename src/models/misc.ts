export enum VehicleCategory {
  CARGO = "CARGO",
  PASSENGER = "PASSENGER",
  SPRECIAL = "SPRECIAL",
}

export type FilterControllBtn = { label: VehicleCategory | "ALL"; id: number };
