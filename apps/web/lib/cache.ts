// Simple in-memory cache to prevent excessive API calls
const cacheStore = new Map<string, { data: any, timestamp: number }>();

export const cache = {
  set: (key: string, data: any, ttlMs: number = 60000) => {
    cacheStore.set(key, { data, timestamp: Date.now() + ttlMs });
  },
  get: (key: string) => {
    const entry = cacheStore.get(key);
    if (!entry) return null;
    if (Date.now() > entry.timestamp) {
      cacheStore.delete(key);
      return null;
    }
    return entry.data;
  },
  clear: (keyStartsWith?: string) => {
    if (!keyStartsWith) {
      cacheStore.clear();
      return;
    }
    Array.from(cacheStore.keys()).forEach((key) => {
      if (key.startsWith(keyStartsWith)) {
        cacheStore.delete(key);
      }
    });
  }
};
