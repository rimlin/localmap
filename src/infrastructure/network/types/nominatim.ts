export type NominatimLocationPlace = {
  place_id: number;
  licence: string;
  osm_type: string;
  osm_id: number;
  lat: string;
  lon: string;
  place_rank: number;
  category: string;
  type: string;
  importance: number;
  addresstype: string;
  name: string;
  display_name: string;
  address: {
    road: string;
    suburb: string;
    city: string;
    county: string;
    province: string;
    region: string;
    postcode: string;
    country: string;
    country_code: string;
  };
  boundingbox: string[];
};
