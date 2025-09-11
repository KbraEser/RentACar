import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../store/store";

import { useEffect } from "react";
import { fetchCars } from "../store/slices/carSlice";

import type { Car } from "../types/car";
function CarCard() {
  const dispatch = useDispatch<AppDispatch>();
  const { list: cars, loading } = useSelector((state: RootState) => state.car);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

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
