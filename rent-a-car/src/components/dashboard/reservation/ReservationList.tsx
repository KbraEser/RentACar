import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks/storeHooks";
import type { RootState } from "../../../store/store";
import { fetchRentals } from "../../../store/slices/rentalsSlice";
import LoadingCard from "../../common/LoadingCard";
import { cancelReservation } from "../../../store/slices/rentalsSlice";
const ReservationList = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.auth.user);
  const { rentals, loading, error } = useAppSelector(
    (state: RootState) => state.rentals
  );

  useEffect(() => {
    if (user) {
      dispatch(fetchRentals(user.id));
    }
  }, [dispatch, user]);

  if (loading) {
    return (
      <div className="space-y-6 m-10">
        <LoadingCard title="Rezervasyonlar yükleniyor..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6 m-10">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-gray-800)" }}
          >
            Rezervasyonlarım
          </h1>
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

  if (rentals.length === 0) {
    return (
      <div className="space-y-6 m-8">
        <div
          className="rounded-lg shadow-lg p-6"
          style={{ backgroundColor: "var(--color-white)" }}
        >
          <h1
            className="text-2xl font-bold mb-4"
            style={{ color: "var(--color-gray-800)" }}
          >
            Rezervasyonlarım
          </h1>
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

  return (
    <div className="space-y-6 m-10">
      <div
        className="rounded-lg shadow-lg p-6"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <h1
          className="text-2xl font-bold mb-4"
          style={{ color: "var(--color-gray-800)" }}
        >
          Rezervasyonlarım
        </h1>
        <div className="w-full">
          {rentals.map((reservation) => (
            <div
              key={reservation.id}
              className="border rounded-lg p-4"
              style={{ borderColor: "var(--color-gray-300)" }}
            >
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: "var(--color-gray-800)" }}
              >
                Araç ID: {reservation.car_id}
              </h3>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--color-gray-600)" }}
              >
                {new Date(reservation.start_date).toLocaleDateString("tr-TR")} -{" "}
                {new Date(reservation.end_date).toLocaleDateString("tr-TR")}
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--color-gray-600)" }}
              >
                Toplam: {reservation.total_price}₺
              </p>
              <p
                className="text-sm mb-2"
                style={{ color: "var(--color-gray-600)" }}
              >
                Durum: {reservation.status}
              </p>
              <button
                disabled={reservation.status === "cancelled"}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                onClick={() => {
                  dispatch(cancelReservation(reservation.id as string));
                }}
              >
                {reservation.status === "active" ? "İptal Et" : "İptal Edildi"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReservationList;
