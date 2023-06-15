import { useState } from "react";
import mockData from "../data.json";
import { VehicleItemType } from "../models/entities";

export const useFetchMockData = () => {
  const [data, setData] = useState<undefined | VehicleItemType[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = (id?: number) => {
    try {
      setIsLoading(true);
      const vehicles = mockData.vehicles as VehicleItemType[];
      if (!id) {
        fetchCallback(vehicles);
        return;
      }

      const idx = vehicles.findIndex((el) => el.id);
      idx !== -1 && fetchCallback([vehicles[idx]]);
    } catch (error) {
      console.log("cath error in useFetchMockData:", error);
    }
  };

  const fetchCallback = (response: VehicleItemType[]) =>
    setTimeout(() => {
      setData(response);
      setIsLoading(false);
    }, Math.floor(Math.random() * 2000));

  return { data: data, isLoading, fetch };
};
