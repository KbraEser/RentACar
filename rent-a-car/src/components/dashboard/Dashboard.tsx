import { NavLink } from "react-router-dom";
import { useAppSelector } from "../../app/hooks/storeHooks";
import type { RootState } from "../../store/store";
import { getCarImage } from "../utils/carImages";

const Dashboard = () => {
  const user = useAppSelector((state: RootState) => state.auth.user);
  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">CARRENTAL</div>
        <ul className="nav-links">
          <li>
            <NavLink to="/cars">Araçlar</NavLink>
          </li>
          <li>
            <NavLink to="/reservations">Rezervasyonlarım</NavLink>
          </li>
          <li>
            <NavLink to="/profile">Profil</NavLink>
          </li>
        </ul>
        <div className="user-menu">
          <span>Hoş geldin, {user?.user_metadata.name}</span>
          <button className="btn-outline">Çıkış Yap</button>
        </div>
      </nav>
      {/* Header */}
      <header className="dashboard-header">
        <h1>Merhaba, {user?.user_metadata.name} 👋</h1>
        <p>Rezervasyonlarını yönetebilir, yeni araç kiralayabilirsin.</p>
      </header>
      {/* Cards */}
      <div className="cards">
        <div className="card">Rezervasyonlarım</div>
        <div className="card">Yeni Araç Kiralama</div>
        <div className="card">Profilim</div>
      </div>
      {/* Reservations */}
      <div className="reservations">
        <h2>Aktif Rezervasyonlar</h2>
        <div className="reservation-list">
          <table>
            <thead>
              <tr>
                <th>Araç</th>
                <th>Başlangıç Tarihi</th>
                <th>Bitiş Tarihi</th>
                <th>Lokasyon</th>
                <th>Durum</th>
              </tr>
            </thead>
            <tbody>
              <td className="reservation-cell">
                <div className="reservation-cell-content">
                  <img
                    src={getCarImage(car.make)}
                    alt={`${car.make} ${car.model}`}
                  />
                  <span>
                    {car.make} {car.model}
                  </span>
                </div>
              </td>
              <td className="reservation-cell">
                <span>{car.start_date}</span>
              </td>
              <td className="reservation-cell">
                <span>{car.end_date}</span>
              </td>
              <td className="reservation-cell">
                <span>{car.location}</span>
              </td>
              <td className="reservation-cell">
                <span>{car.status}</span>
              </td>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
