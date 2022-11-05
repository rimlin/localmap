class LocalStorageService {
  setJson(key: string, json: object) {
    try {
      localStorage.setItem(key, JSON.stringify(json));
    } catch (err) {
      console.error(err);
    }
  }

  getJson(key: string) {
    try {
      const item = localStorage.getItem(key);

      if (item) {
        return JSON.parse(item);
      } else {
        return null;
      }
    } catch (err) {
      console.error(err);

      return null;
    }
  }
}

export const localStorageService = new LocalStorageService();
