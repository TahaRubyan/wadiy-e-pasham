/**
 * Smooth and rapid scroll-to-top transition utility
 */
export const smoothScrollToTop = () => {
  if (typeof window !== 'undefined') {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};
