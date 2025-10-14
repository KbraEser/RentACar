import { useAppSelector } from "../../../app/hooks/storeHooks";
import type { RootState } from "../../../store/store";

const ReservationListError = () => {
  const { error } = useAppSelector((state: RootState) => state.rentals);

  if (error) {
    return (
      <div className="space-y-4 m-15">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <div className="text-center py-12">
            <div className="text-red-500 mb-4">
              <svg
                className="mx-auto h-16 w-16"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <h3
              className="text-lg font-medium mb-2"
              style={{ color: "var(--color-gray-800)" }}
            >
              Hata Oluştu
            </h3>
            <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
              {error}
            </p>
          </div>
        </div>
      </div>
    );
  }
};

export default ReservationListError;
