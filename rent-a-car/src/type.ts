export interface Car {
  id: number;
  brand: string;
  model: string;
  year: number;
  price: number;
  image_url: string;
  description: string;
  is_available: boolean;
  category: string;
}

export interface CarState {
  cars: Car[];
  selectedCar: Car | null;
  isLoading: boolean;
  error: string | null;
}
