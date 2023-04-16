export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: CompanyDetails;
}

interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Coordinates
}

interface Coordinates {
  lat: string;
  lng: string;
}

interface CompanyDetails {
  name: string;
  catchPhrase: string;
  bs: string;
}