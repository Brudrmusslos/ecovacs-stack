export function debug<T>(label: string, value: T): T {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`[DEBUG] ${label}:`, JSON.stringify(value, null, 2));
  }
  return value;
}
