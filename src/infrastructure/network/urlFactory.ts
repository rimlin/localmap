export const API_URL = process.env.REACT_APP_API_HOST;

export const URL_FACTORY = {
  NOMINATIM: {
    ROOT: 'https://nominatim.openstreetmap.org',
    LOCATION: (lat: number, lng: number) =>
      `${URL_FACTORY.NOMINATIM.ROOT}/reverse?format=jsonv2&lat=${lat}&lon=${lng}`,
  },
};
