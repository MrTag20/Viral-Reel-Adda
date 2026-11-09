/**
 * Central Configuration for Viral Reel Adda
 * Keep UPI, business details, and WhatsApp settings here.
 */

export const PAYMENT_CONFIG = {
  UPI_ID: "farhadkhan2799@okaxis",
  PAYEE_NAME: "Viral Reel Adda",
  CURRENCY: "INR",
  // Replace this placeholder with your actual 10-digit or international business WhatsApp number (e.g. "919876543210")
  WHATSAPP_NUMBER: "REPLACE_WITH_YOUR_BUSINESS_WHATSAPP_NUMBER",
};

/**
 * Generate a dynamic UPI payment link
 */
export function generateUpiLink({
  upiId = PAYMENT_CONFIG.UPI_ID,
  payeeName = PAYMENT_CONFIG.PAYEE_NAME,
  amount,
  orderId,
  currency = PAYMENT_CONFIG.CURRENCY,
}: {
  upiId?: string;
  payeeName?: string;
  amount: number;
  orderId: string;
  currency?: string;
}): string {
  const encodedName = encodeURIComponent(payeeName);
  const note = encodeURIComponent(`Order ${orderId}`);
  // Standard NPCI UPI URI Scheme
  return `upi://pay?pa=${upiId}&pn=${encodedName}&am=${amount.toFixed(2)}&cu=${currency}&tn=${note}`;
}

/**
 * Build prefilled WhatsApp message for manual verification
 */
export function buildWhatsAppMessage({
  orderId,
  customerName,
  whatsappNumber,
  items,
  totalAmount,
  utr,
}: {
  orderId: string;
  customerName: string;
  whatsappNumber: string;
  items: { name: string; quantity: number }[];
  totalAmount: number;
  utr: string;
}): string {
  const bundlesList = items
    .map((item) => `• ${item.name} (x${item.quantity})`)
    .join("\n");

  return (
    `🔥 *NEW ORDER PAYMENT VERIFICATION - VIRAL REEL ADDA*\n\n` +
    `📦 *Order Reference:* ${orderId}\n` +
    `👤 *Customer Name:* ${customerName}\n` +
    `📱 *Customer WhatsApp:* ${whatsappNumber}\n` +
    `💰 *Amount Paid:* ₹${totalAmount}\n` +
    `🔢 *Submitted UTR / UPI Ref:* ${utr}\n\n` +
    `📁 *Purchased Bundles:*\n${bundlesList}\n\n` +
    `🎁 *Included Free Bonuses:*\n` +
    `• YouTube Growth Mastery Course (Worth ₹999)\n` +
    `• Instagram Growth Mastery Course (Worth ₹999)\n\n` +
    `I have sent the payment via UPI. Please verify my UTR and send my Google Drive access link. Thank you!`
  );
}

/**
 * Format WhatsApp URL based on configured business number
 */
export function getWhatsAppUrl(message: string): string {
  const businessNumber = PAYMENT_CONFIG.WHATSAPP_NUMBER.trim();
  const encodedText = encodeURIComponent(message);

  if (
    !businessNumber ||
    businessNumber === "REPLACE_WITH_YOUR_BUSINESS_WHATSAPP_NUMBER"
  ) {
    // If user hasn't replaced number yet, open WhatsApp share dialog directly
    return `https://api.whatsapp.com/send?text=${encodedText}`;
  }

  // Remove any non-numeric characters for the destination
  const cleanNumber = businessNumber.replace(/\D/g, "");
  return `https://wa.me/${cleanNumber}?text=${encodedText}`;
}

