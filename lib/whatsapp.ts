const WA_NUMBER = "923332361713";

export function buildWhatsAppLink(message: string): string {
  const text = encodeURIComponent(message);
  return `https://wa.me/${WA_NUMBER}?text=${text}`;
}
