export function isFunction<T = unknown>(value: T): value is Extract<T, Function> {
  return typeof value === 'function';
};
