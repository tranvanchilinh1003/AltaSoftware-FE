export function parseBoolean(value: string): boolean {
  return value.toLowerCase() === 'true';
}

export function parseString(value: number): string {
  return Number(value).toString();
}
