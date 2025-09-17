import { useLoaderData } from "react-router-dom";
import type { Car } from "../types/car";
import homeCarImage from "../img/pngwing.com (2).png";

const HomePage = () => {
  const cars = useLoaderData() as Car[];
  return (
    <>
      <div className="hero-section">
        <div className="text-section">
          <h1 className="hero-title">
            Hayalinizdeki Aracı Kolay Hızlı ve Güvenli Bir Şekilde Kiralayın
          </h1>
          <p className="hero-description">
            Dakikalar içinde rezarvasyon yapın ve hemen yola çıkın!
          </p>
          <div className="button-container">
            <button className="primary-button">Aracınızı Seçin</button>
            <button className="secondary-button">Fiyatları Görüntüleyin</button>
          </div>
        </div>
        <div className="image-section">
          <img
            src={homeCarImage}
            alt="homeCar"
            className="xl:w-2/3 xl:h-full object-cover  xl:mr-10 "
          />
        </div>
      </div>
      <div className="inform-section">
        <div className="reservation-section">
          <h2 className="inform-title">Araç Kiralama</h2>
          <div className="search-card">
            <input
              placeholder="Başlangıç Tarihi"
              type="text"
              id="start"
              className="search-input"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />

            <input
              placeholder="Bitiş Tarihi"
              type="text"
              id="end"
              className="search-input"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />

            <input
              placeholder="Lokasyon"
              type="text"
              id="location"
              className="search-input"
            />

            <button className="search-button">Rezervasyon Yapın</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
