import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const ReservationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { city } = location.state || {};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <FaCheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Rezervasyon Başarılı! 🎉
        </h2>

        <p className="text-gray-700 mb-6">
          Rezervasyonunuz başarıyla tamamlandı!
        </p>

        {city && (
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 mb-6">
            <p className="text-orange-800 font-medium mb-2">
              📍 Seçtiğiniz lokasyondan aracınızı alabilirsiniz:
            </p>
            <p className="text-orange-700 text-lg font-semibold">{city}</p>
          </div>
        )}

        <button
          onClick={() => navigate("/")}
          className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 font-medium"
        >
          🏠 Anasayfaya Dön
        </button>
      </div>
    </div>
  );
};

export default ReservationSuccess;
