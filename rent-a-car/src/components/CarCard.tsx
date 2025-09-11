import type { RootState } from "../store/store";
import { useAppDispatch, useAppSelector } from "../app/hooks/storeHooks";

import { useEffect } from "react";
import { fetchCars } from "../store/slices/carSlice";

import type { Car } from "../types/car";
function CarCard() {
  const { list: cars, loading } = useAppSelector(
    (state: RootState) => state.car
  );

  useEffect(() => {
    useAppDispatch()(fetchCars());
  }, [useAppDispatch]);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {cars.map((car: Car) => (
        <div key={car.id}>
          {car.make} {car.model}
        </div>
      ))}
    </div>
  );
}

export default CarCard;
