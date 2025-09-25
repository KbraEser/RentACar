import { useLoaderData, useNavigate } from "react-router-dom";
import type { Car } from "../types/car";
import homeCarImage from "../img/pngwing.com (2).png";
import { getCarImage } from "./utils/carImages";
import { IoCarSport } from "react-icons/io5";
import { IoPricetagsSharp } from "react-icons/io5";
import { IoIosClock } from "react-icons/io";
import { IoShieldCheckmark } from "react-icons/io5";

const HomePage = () => {
  const navigate = useNavigate();
  const featuredCars = useLoaderData() as Car[];
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
            <button
              onClick={() => navigate("/cars")}
              className="primary-button"
            >
              Aracınızı Seçin
            </button>
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
            <input
              placeholder="Araç Modeli"
              type="text"
              id="model"
              className="search-input"
            />

            <button className="search-button">Rezervasyon Yapın</button>
          </div>
        </div>
        <div className="featured-cars">
          <h2 className="inform-title">Öne Çıkan Araçlar</h2>
          <div className="cars-grid">
            {featuredCars.map((car: Car) => (
              <div key={car.id} className="car-card">
                <img
                  src={getCarImage(car.make)}
                  alt={`${car.make} ${car.model}`}
                  className="car-image"
                />
                <div className="car-content">
                  <h3 className="car-title">
                    {car.make} {car.model}
                  </h3>
                  <p className="car-year">Yıl: {car.year}</p>
                  <p className="car-price">₺{car.price_per_day}/gün</p>
                  <p className="car-details">
                    {car.fuel_type} • {car.seats} kişi • {car.transmission}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="icons-section">
          <h2 className="inform-title">Neden Bizi Tercih Etmelisiniz?</h2>
          <div className="icons-grid">
            <div className="icon-card">
              <div className="icon-card-content">
                <IoCarSport />
              </div>
              <h3 className="icon-title">Geniş Araç Filosu</h3>
              <p className="icon-description">
                Geniş araç filosumuz ile size uygun araç bulabilirsiniz.
              </p>
            </div>
            <div className="icon-card">
              <div className="icon-card-content">
                <IoPricetagsSharp />
              </div>
              <h3 className="icon-title"> Uygun Fiyat Garantisi</h3>
              <p className="icon-description">
                En uygun fiyatlarımız ile araç ihtiyacınızı karşılayabiliriz.
              </p>
            </div>
            <div className="icon-card">
              <div className="icon-card-content">
                <IoIosClock />
              </div>
              <h3 className="icon-title"> 7/24 Destek</h3>
              <p className="icon-description">
                Ulaşılabilir hizmetimiz ile her türlü sorununuzu çözebiliriz.
              </p>
            </div>
            <div className="icon-card">
              <div className="icon-card-content">
                <IoShieldCheckmark />{" "}
              </div>
              <h3 className="icon-title">Sigortalı Araçlar</h3>
              <p className="icon-description">
                Sigortalı araçlarımızı konforlu ve güvenli bir şekilde
                kiralayabilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
