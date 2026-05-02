"use client";

import { useLang } from "@/context/LangContext";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { buildWhatsAppLink } from "@/lib/whatsapp";
import { WHATSAPP_INFO_MESSAGE } from "@/lib/contact-messages";

export function FloatingWhatsApp() {
  const { t } = useLang();
  const href = buildWhatsAppLink(WHATSAPP_INFO_MESSAGE);

  return (
    <WhatsAppButton
      variant="floating"
      href={href}
      tooltip={t.whatsTooltip}
      trackingId="whatsapp_floating"
    />
  );
}
