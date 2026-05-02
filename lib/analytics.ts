export function trackEvent(
  name: string,
  params?: Record<string, string | number | boolean | undefined>
) {
  if (typeof window === "undefined") return;

  let payload: Record<string, unknown> | undefined;
  if (params) {
    payload = {};
    for (const [k, v] of Object.entries(params)) {
      if (v !== undefined && v !== null) payload[k] = v;
    }
  }

  if (typeof window.gtag === "function") {
    window.gtag("event", name, payload ?? {});
    return;
  }
  console.log("[analytics]", name, payload ?? {});
}
