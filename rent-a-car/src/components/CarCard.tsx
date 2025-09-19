import { useLoaderData } from "react-router-dom";
import type { Car } from "../types/car";
import { getCarImage } from "./utils/carImages";

function CarCard() {
  const cars = useLoaderData() as Car[];

  return (
    <>
      <div className="py-10">
        <h2 className="text-xl font-bold">Öne Çıkan Araçlar</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car: Car) => (
            <div key={car.id}>
              <div>
                <img
                  src={getCarImage(car.make)}
                  alt={`${car.make} ${car.model}`}
                />
                <h3>
                  {car.make} {car.model}
                </h3>
                <p>{car.year}</p>
                <p>{car.price_per_day}</p>
                <p>
                  {car.fuel_type} {car.seats} {car.transmission}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default CarCard;
