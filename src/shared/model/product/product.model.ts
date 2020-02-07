
export interface Store {
  isLoggedIn:          boolean;
  cart:                Product[];
  isCartOpen:          boolean;
  isAdminUser:         boolean;
  currentProduct:      Product;
  adminCurrentProduct: Product;
  buyNowProduct:       null;
}

export interface Price {
  max:     number;
  min:     number;
  offer:   Offer;
  on_sale: boolean;
}

export enum Offer {
  Empty = "",
  WinningBid = "winning bid",
}

export interface Product {
  id:                  string;
  brand:               string;
  categories:          string;
  colors:              string;
  condition:           string;
  currency:            string;
  current_stock:       number;
  dateadded:           string;
  dateupdated:         string;
  descriptions:        Description[] | string;
  dimension:           string;
  features:            Feature[] | string;
  imageurls:           string;
  manufacturer:        string;
  name:                string;
  price:               Price;
  prices_returnpolicy: string;
  prices_shipping:     string;
  prices_size:         string;
  prices_sourceurls:   string;
  prices_warranty:     string;
  quantity:            number;
  reviews:             Review[] | string;
  sizes:               number | string;
  sourceurls:          string;
}

export interface Description {
  dateSeen:   string[];
  sourceURLs: string[];
  value:      string;
}

export interface Feature {
  key:   string;
  value: string[];
}

export interface Review {
  date?:      string;
  dateAdded:  string;
  dateSeen:   string[];
  sourceURLs: string[];
  text:       string;
  title:      string;
  username:   string;
}

