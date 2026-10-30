// "lite" is set on <html> by the inline script in index.html for slow
// devices, slow connections, Data Saver, or reduced-motion users.
export const isLite = () =>
  typeof document !== "undefined" &&
  document.documentElement.classList.contains("lite");

export const isMobileWidth = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 767px)").matches;
