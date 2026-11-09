export interface OrderItem {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice: number;
  quantity: number;
  gradient?: string;
  icon?: string;
  videoCount?: string;
}

export interface CustomerDetails {
  name: string;
  whatsapp: string;
  email?: string;
}

export type OrderStatus =
  | "Payment Pending"
  | "Payment Pending Verification"
  | "Verified & Delivered";

export interface Order {
  orderId: string;
  createdAt: string;
  customer: CustomerDetails;
  items: OrderItem[];
  subtotal: number;
  totalOriginal: number;
  totalSavings: number;
  totalAmount: number;
  status: OrderStatus;
  utr?: string;
  utrSubmittedAt?: string;
  freeBonuses: string[];
}

const ORDERS_STORAGE_KEY = "viralreeladda_orders_v1";

/**
 * Generate unique order reference in format VRA-YYYYMMDD-XXXX
 */
export function generateOrderId(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VRA-${year}${month}${day}-${randomChars}`;
}

/**
 * Save or update an order in localStorage
 */
export function saveOrder(order: Order): void {
  if (typeof window === "undefined") return;
  try {
    const orders = getAllOrders();
    const existingIndex = orders.findIndex((o) => o.orderId === order.orderId);
    if (existingIndex > -1) {
      orders[existingIndex] = order;
    } else {
      orders.unshift(order);
    }
    localStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders));
  } catch (e) {
    console.error("Failed to save order to localStorage", e);
  }
}

/**
 * Get all saved orders from localStorage
 */
export function getAllOrders(): Order[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(ORDERS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error("Failed to read orders from localStorage", e);
    return [];
  }
}

/**
 * Retrieve a specific order by order reference
 */
export function getOrderById(orderId: string): Order | null {
  const orders = getAllOrders();
  return orders.find((o) => o.orderId === orderId) || null;
}

/**
 * Update UTR and status for an order
 */
export function updateOrderUtr(orderId: string, utr: string): Order | null {
  const order = getOrderById(orderId);
  if (!order) return null;

  const updated: Order = {
    ...order,
    utr,
    utrSubmittedAt: new Date().toISOString(),
    status: "Payment Pending Verification",
  };

  saveOrder(updated);
  return updated;
}

