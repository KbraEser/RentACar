import { useAppSelector } from "../../../app/hooks/storeHooks";
import type { RootState } from "../../../store/store";

const ReservationListNull = () => {
  const { rentals } = useAppSelector((state: RootState) => state.rentals);
  if (rentals.length === 0) {
    return (
      <div className="space-y-6 ">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <div className="text-center py-12">
            <svg
              className="mx-auto h-16 w-16 mb-4"
              style={{ color: "var(--color-gray-400)" }}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: "var(--color-gray-800)" }}
            >
              Henüz rezervasyon yok
            </h3>
            <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
              İlk rezervasyonunuzu yapmak için araçları inceleyin.
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ReservationListNull;
