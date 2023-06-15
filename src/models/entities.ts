import { VehicleCategory } from "./misc";

export type VehicleItemType = {
  id: number;
  category: VehicleCategoryType;
  coordinats: {
    lan: number;
    lat: number;
  };
  driverName: string;
  driverPhone: string;
};

export type VehicleCategoryType = keyof typeof VehicleCategory;
