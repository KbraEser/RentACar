export type Rentals = {
  user_id: string;
  car_id: string;

  start_date: string;
  end_date: string;
  total_price: number;
  status: string;
  city: string;
  id?: string; // Optional
  created_at?: string; // Optional - DB otomatik ekler
  updated_at?: string; // Optional - DB otomatik ekler
  delivery_location: string;
  cars?: {
    make: string;
    model: string;
    year: number;
  };
};
