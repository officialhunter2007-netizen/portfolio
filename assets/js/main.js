(function () {
  document.documentElement.classList.add("js");

  var nav = document.querySelector(".nav");
  var onScroll = function () { if (nav) nav.classList.toggle("scrolled", window.scrollY > 8); };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var btn = document.querySelector(".menu-btn");
  var list = document.getElementById("nav-list");
  if (btn && list) {
    btn.addEventListener("click", function () {
      var open = list.classList.toggle("open");
      btn.setAttribute("aria-expanded", String(open));
    });
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "A") { list.classList.remove("open"); btn.setAttribute("aria-expanded", "false"); }
    });
  }

  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("in"); });
  }

  /* Optional contact links from config.js (rendered only when filled in) */
  var cfg = window.SITE || {};
  document.querySelectorAll("[data-contact]").forEach(function (box) {
    if (cfg.email) box.insertAdjacentHTML("beforeend", '<a class="btn primary" href="mailto:' + encodeURI(cfg.email) + '">Email me</a>');
    if (cfg.linkedin) box.insertAdjacentHTML("beforeend", '<a class="btn" href="' + encodeURI(cfg.linkedin) + '" rel="noopener">LinkedIn</a>');
    if (cfg.cv) box.insertAdjacentHTML("beforeend", '<a class="btn" href="' + encodeURI(cfg.cv) + '">Download CV</a>');
  });

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
