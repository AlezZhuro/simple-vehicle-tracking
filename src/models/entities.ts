type VehicleItemType = {
  id: number;
  category: VehicleCategoryType;
  coordinats: {
    lan: number;
    lat: number;
  };
  driverName: string;
  driverPhone: string;
};

type VehicleCategoryType = keyof typeof VehicleCategory;

enum VehicleCategory {
  CARGO = "CARGO",
  PASSENGER = "PASSENGER",
  SPRECIAL = "SPRECIAL",
}
