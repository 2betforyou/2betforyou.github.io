const navToggle = document.querySelector(".greedy-nav__toggle");
const navMenu = document.querySelector("#site-nav-menu");

const syncNavState = () => {
  if (!navToggle || !navMenu) return;
  const isOpen = !navMenu.classList.contains("hidden");
  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Show navigation menu");
};

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => requestAnimationFrame(syncNavState));
  window.addEventListener("resize", syncNavState);
  syncNavState();
}

const authorToggle = document.querySelector(".author__urls-wrapper button");
const authorLinks = document.querySelector("#author-links");

if (authorToggle && authorLinks) {
  authorToggle.addEventListener("click", () => {
    requestAnimationFrame(() => {
      authorToggle.setAttribute("aria-expanded", String(authorLinks.offsetParent !== null));
    });
  });
}
