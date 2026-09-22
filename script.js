document.documentElement.classList.add("js");

const profileImage = document.querySelector(".profile-photo");
const profileImageWrap = document.querySelector(".profile-photo-wrap");
const backToTopButton = document.querySelector(".back-to-top");
const revealElements = document.querySelectorAll(".reveal");

const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)"
).matches;

// Display the initials fallback if profile.jpg cannot load.
function showPhotoFallback() {
  profileImageWrap?.classList.add("photo-missing");
}

if (profileImage) {
  profileImage.addEventListener("error", showPhotoFallback);

  if (profileImage.complete && profileImage.naturalWidth === 0) {
    showPhotoFallback();
  }
}

// Show the back-to-top button after scrolling down the page.
function updateBackToTopButton() {
  backToTopButton?.classList.toggle("is-visible", window.scrollY > 500);
}

window.addEventListener("scroll", updateBackToTopButton, {
  passive: true
});

updateBackToTopButton();

// Return to the top of the page when the button is clicked.
backToTopButton?.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: prefersReducedMotion ? "auto" : "smooth"
  });
});

// Add subtle reveal animations as sections enter the screen.
if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealElements.forEach((element) => {
    element.classList.add("is-visible");
  });
} else {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -24px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
}
