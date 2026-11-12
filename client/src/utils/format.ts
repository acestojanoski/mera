export const quantityFormatter = new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 3,
});

export function formatQuantity(value: number): string {
  return quantityFormatter.format(value);
}
