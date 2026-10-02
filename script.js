(function () {
  "use strict";

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["inicio", "sobre", "projetos", "contato"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);

  function setActive(id) {
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.dataset.section === id);
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const href = link.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(link.dataset.section);
      history.replaceState(null, "", href);
    });
  });

  const chevron = document.querySelector(".scroll-chevron");
  if (chevron) {
    chevron.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(chevron.getAttribute("href"));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((en) => en.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -45% 0px", threshold: [0, 0.25, 0.5, 0.75] }
    );
    sections.forEach((sec) => observer.observe(sec));
  }
})();
