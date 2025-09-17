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
            className="w-2/3 h-full object-cover mr-10"
          />
        </div>
      </div>
      <div className="inform-section">
        <div className="reservation-section">
          <h2 className="hero-title">Araç Kiralama</h2>
          <div className="search-card">
            <div className="field">
              <label htmlFor="start" className="search-text">
                Başlangıç Tarihi
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
