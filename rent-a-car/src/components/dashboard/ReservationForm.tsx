import { useLoaderData } from "react-router-dom";
import { getCarImage } from "../utils/carImages";
import type { Car } from "../../types/car";

const ReservationForm = () => {
  const car = useLoaderData() as Car;
  return (
    <>
      <div className="space-y-6 m-10">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-gray-800)" }}
          >
            Rezervasyon Formu
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <img src={getCarImage(car.make)} alt={`${car.make} ${car.model}`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default ReservationForm;
