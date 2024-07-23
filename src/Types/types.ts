export interface TUsers {
    id: number;
    full_name: string;
    email: string;
    contact_phone: string;
    address: string;
    role: string;
  }
   
  export interface TVehicle {
    id: number;
    rental_price: number;
    availability: boolean;
    manufacturer: string;
    model: string;
    year: number;
    fuel_type: string;
    seating_capacity: number;
    features: string;
    image_url: string;
    created_at?: Date;
    updated_at?: Date;
  } 

  
export interface TBooking {
  id: number;
  user_id: number;
  vehicle_id: number;
  location_id: number;
  booking_date: string;
  return_date: string;
  total_amount: number;
  booking_status: string;
  created_at?: Date;
  updated_at?: Date;
}
export interface TLocation {
  id?: number;
  name: string;
  address: string;
  contact_phone: string;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export interface TCustomer {
  id: number;
  user_id: number;
  subject: string;
  description: string;
  status: string;
  created_at: Date | null;
  updated_at: Date | null;
}

