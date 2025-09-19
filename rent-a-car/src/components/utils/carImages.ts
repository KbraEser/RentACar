import bmwImage from "../../img/car/bmw.png";
import alfaRomeoImage from "../../img/car/alfaRomeo.png";
import cherryImage from "../../img/car/chery.png";
import citroenImage from "../../img/car/citroen.png";
import fordImage from "../../img/car/ford.png";
import hondaImage from "../../img/car/honda.png";
import jeepImage from "../../img/car/jeep.png";
import mercedesImage from "../../img/car/mercedes.png";
import nissanImage from "../../img/car/nissan.png";
import ssangyongImage from "../../img/car/ssangYong.png";
import subaruImage from "../../img/car/subaru.png";
import teslaImage from "../../img/car/tesla.png";
import toyotaImage from "../../img/car/toyota.png";
import volkswagenImage from "../../img/car/volkswagen.png";
import volvoImage from "../../img/car/volvo.png";
import defaultImage from "../../img/car/default.png";

export const carImages: Record<string, string> = {
  alfaromeo: alfaRomeoImage,
  bmw: bmwImage,
  chery: cherryImage,
  citroen: citroenImage,
  ford: fordImage,
  honda: hondaImage,
  jeep: jeepImage,
  mercedes: mercedesImage,
  nissan: nissanImage,
  ssangyong: ssangyongImage,
  subaru: subaruImage,
  tesla: teslaImage,
  toyota: toyotaImage,
  volkswagen: volkswagenImage,
  volvo: volvoImage,
  default: defaultImage,
};

export const getCarImage = (make: string) => {
  const key = make.toLowerCase();
  return carImages[key] || carImages.default;
};
