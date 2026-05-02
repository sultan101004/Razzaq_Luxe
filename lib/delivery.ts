export const DELIVERY_FLAT_PKR = 200;
export const FREE_DELIVERY_THRESHOLD_PKR = 2500;

export function computeDeliveryFee(subtotal: number): number {
  if (subtotal >= FREE_DELIVERY_THRESHOLD_PKR) return 0;
  return DELIVERY_FLAT_PKR;
}
