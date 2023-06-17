import { useState } from "react";
import mockData from "../data.json";
import { VehicleItemType } from "../models/entities";

interface UseFetchMockDataI<T> {
  data: T[] | undefined;
  isLoading: boolean;
  fetch: (id?: number) => void;
}

export function useFetchMockData<T extends VehicleItemType> (): UseFetchMockDataI<T> {
  const [data, setData] = useState<undefined | T[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetch = (id?: number) => {
    try {
      setIsLoading(true);
      const vehicles = mockData.vehicles as T[];
      if (!id) {
        fetchCallback(vehicles);
        return;
      }

      const idx = vehicles.findIndex((el) => el.id === id);

      idx !== -1 && fetchCallback([vehicles[idx]]);
    } catch (error) {
      console.log("cath error in useFetchMockData:", error);
    }
  };

  const fetchCallback = (response: T[]) =>
    setTimeout(() => {
      setData(response);
      setIsLoading(false);
    }, Math.floor(Math.random() * 2000));

  return { data: data, isLoading, fetch };
};
