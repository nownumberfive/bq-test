export default function selfish<T>(target: T): T {
  const cache = new WeakMap();
  const handler = {
    get(target: any, key: any) {
      const value = Reflect.get(target, key);

      if (typeof value !== 'function') {
        return value;
      }
      if (!cache.has(value)) {
        cache.set(value, value.bind(target));
      }

      return cache.get(value);
    },
  };

  return new Proxy(target, handler);
}
