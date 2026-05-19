export const SHOP_CART_KEY = 'nanzad-shop-cart';

export type SharedCartItem = {
  id: number;
  name: string;
  price: number;
  qty: number;
  variant?: string;
};

export function loadSharedCart(): SharedCartItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(SHOP_CART_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (row): row is SharedCartItem =>
        typeof row === 'object' &&
        row !== null &&
        typeof (row as SharedCartItem).id === 'number' &&
        typeof (row as SharedCartItem).name === 'string' &&
        typeof (row as SharedCartItem).price === 'number' &&
        typeof (row as SharedCartItem).qty === 'number'
    );
  } catch {
    return [];
  }
}

export function saveSharedCart(items: SharedCartItem[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(SHOP_CART_KEY, JSON.stringify(items));
}
