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
  var revealAll = function () { items.forEach(function (el) { el.classList.add("in"); }); };
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    revealAll();
  }
  /* Safety net: content must never stay hidden if the observer misbehaves. */
  window.addEventListener("load", function () { setTimeout(revealAll, 1200); });
  setTimeout(revealAll, 2500);

  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
})();
