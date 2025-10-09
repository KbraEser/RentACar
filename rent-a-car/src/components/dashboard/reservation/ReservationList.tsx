import { useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../../../app/hooks/storeHooks";
import type { RootState } from "../../../store/store";
import { fetchRentals } from "../../../store/slices/rentalsSlice";
import LoadingCard from "../../common/LoadingCard";
import { cancelReservation } from "../../../store/slices/rentalsSlice";
import { toast } from "react-toastify";

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
      <div className="space-y-6 m-10 ">
        <LoadingCard title="Rezervasyonlar yükleniyor..." />
      </div>
    );
  }

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

  return (
    <div className="space-y-6 mt-10 ">
      {" "}
      <div
        className="rounded-lg shadow-lg p-6 "
        style={{ backgroundColor: "var(--color-white)" }}
      >
        {" "}
        <h1
          className="text-xl font-bold mb-4"
          style={{ color: "var(--color-gray-800)" }}
        >
          Rezervasyon Listesi
        </h1>
        <div className="overflow-x-auto ">
          <table className="w-full border-collapse rounded-lg shadow-lg">
            <thead>
              <tr>
                <th className="text-left p-2 text-gray-600">Araç</th>
                <th className="text-left p-2 text-gray-600">Başlangıç</th>
                <th className="text-left p-2 text-gray-600">Bitiş </th>
                <th className="text-left p-2 text-gray-600">Toplam Fiyat</th>
                <th className="text-left p-2 text-gray-600">Durum</th>
                <th className="text-left p-2 text-gray-600">Alış Yeri</th>
              </tr>
            </thead>
            <tbody>
              {rentals.map((reservation) => {
                console.log("Reservation:", reservation);
                return (
                  <tr
                    className="border-b"
                    key={reservation.id || reservation.car_id}
                  >
                    <td className=" p-2">
                      {reservation.cars
                        ? `${reservation.cars.make} ${reservation.cars.model}`
                        : `Araç ID: ${reservation.car_id}`}
                    </td>
                    <td className=" p-2">
                      {new Date(reservation.start_date).toLocaleDateString(
                        "tr-TR"
                      )}
                    </td>
                    <td className=" p-2">
                      {new Date(reservation.end_date).toLocaleDateString(
                        "tr-TR"
                      )}
                    </td>
                    <td className=" p-2 ">{reservation.total_price} ₺</td>
                    <td className=" p-2">
                      <span
                        className={`px-2 py-2 rounded-full text-sm font-medium ${
                          reservation.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {reservation.status === "active" ? "Aktif" : "İptal "}
                      </span>
                    </td>
                    <td className=" p-2">
                      {reservation.city}-{reservation.delivery_location}
                    </td>
                    <td className=" p-2">
                      <button
                        onClick={() =>
                          toast.warning(
                            "Rezervasyonu iptal etmek istediğinizden emin misiniz?",
                            {
                              onClick: () => {
                                dispatch(
                                  cancelReservation(reservation.id || "")
                                );
                                toast.success(
                                  "Rezervasyon başarıyla iptal edildi"
                                );
                              },
                            }
                          )
                        }
                        disabled={reservation.status === "cancelled"}
                        className="primary-button "
                      >
                        {reservation.status === "active"
                          ? "İptal Et"
                          : "İptal Edildi"}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="w-full"></div>
      </div>
    </div>
  );
};

export default ReservationList;
