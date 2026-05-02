export {};

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventNameOrConfig: string | Date,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}
