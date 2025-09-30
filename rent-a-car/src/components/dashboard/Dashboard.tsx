import { useAppSelector } from "../../app/hooks/storeHooks";
import type { RootState } from "../../store/store";
import { NavLink } from "react-router-dom";
import {
  AiOutlineCalendar,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineFileText,
} from "react-icons/ai";

const Dashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);

  return (
    <div className="space-y-6 m-10">
      {/* Header */}
      <div
        className="rounded-lg shadow-lg p-6"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <h1
          className="text-2xl font-bold mb-2"
          style={{ color: "var(--color-gray-800)" }}
        >
          Merhaba, {user?.user_metadata?.name || "Kullanıcı"} 👋
        </h1>
        <p style={{ color: "var(--color-gray-600)" }}>
          Rezervasyonlarını yönetebilir, yeni araç kiralayabilirsin.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <NavLink
          to="/dashboard/reservations"
          className="rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border"
          style={{
            backgroundColor: "var(--color-white)",
            borderColor: "var(--color-gray-300)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-orange-500)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-gray-300)";
          }}
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-orange-600)" }}
            >
              <AiOutlineCalendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-gray-800)" }}
              >
                Rezervasyonlarım
              </h3>
              <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
                Aktif rezervasyonlar
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/cars"
          className="rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border"
          style={{
            backgroundColor: "var(--color-white)",
            borderColor: "var(--color-gray-300)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-orange-500)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-gray-300)";
          }}
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-orange-600)" }}
            >
              <AiOutlinePlus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-gray-800)" }}
              >
                Yeni Araç Kiralama
              </h3>
              <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
                Mevcut araçları incele
              </p>
            </div>
          </div>
        </NavLink>

        <NavLink
          to="/dashboard/profile"
          className="rounded-lg shadow-md p-4 hover:shadow-lg transition-all duration-300 border"
          style={{
            backgroundColor: "var(--color-white)",
            borderColor: "var(--color-gray-300)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--color-orange-500)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--color-gray-300)";
          }}
        >
          <div className="flex items-center space-x-4">
            <div
              className="w-12 h-12 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: "var(--color-orange-600)" }}
            >
              <AiOutlineUser className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3
                className="text-lg font-semibold"
                style={{ color: "var(--color-gray-800)" }}
              >
                Profilim
              </h3>
              <p className="text-sm" style={{ color: "var(--color-gray-600)" }}>
                Hesap bilgilerini düzenle
              </p>
            </div>
          </div>
        </NavLink>
      </div>

      {/* Recent Reservations */}
      <div
        className="rounded-lg shadow-lg"
        style={{ backgroundColor: "var(--color-white)" }}
      >
        <div
          className="p-4"
          style={{ borderBottom: "1px solid var(--color-gray-300)" }}
        >
          <h2
            className="text-lg font-semibold"
            style={{ color: "var(--color-gray-800)" }}
          >
            Aktif Rezervasyonlar
          </h2>
        </div>
        <div className="p-4">
          <div className="text-center py-8">
            <AiOutlineFileText
              className="mx-auto h-12 w-12"
              style={{ color: "var(--color-gray-400)" }}
            />
            <h3
              className="mt-2 text-sm font-medium"
              style={{ color: "var(--color-gray-800)" }}
            >
              Henüz rezervasyon yok
            </h3>
            <p
              className="mt-1 text-sm"
              style={{ color: "var(--color-gray-500)" }}
            >
              İlk rezervasyonunuzu yapmak için araçları inceleyin.
            </p>
            <div className="mt-6">
              <NavLink
                to="/dashboard/cars"
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white transition-colors"
                style={{
                  backgroundColor: "var(--color-orange-600)",
                  borderColor: "var(--color-orange-600)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-orange-500)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--color-orange-600)";
                }}
              >
                Araçları İncele
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
