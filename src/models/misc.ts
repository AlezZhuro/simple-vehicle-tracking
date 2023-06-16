export enum VehicleCategory {
  CARGO = "CARGO",
  PASSENGER = "PASSENGER",
  SPECIAL = "SPECIAL",
}

export enum VehicleCategoryColor {
  CARGO = "red",
  PASSENGER = "green",
  SPECIAL = "blue",
}

export type FilterControllBtn = { label: VehicleCategory | "ALL"; id: number };
