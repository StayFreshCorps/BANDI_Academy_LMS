(function () {
  var home = "7da676c4-dc59-49b7-87c4-8381de9ca55c.html";
  var courses = "76772ca1-5809-4ff0-a7b3-b3d26a48bf89.html";
  var course = "d6b61e5b-7b7a-4333-a914-464caf834d5a.html";
  var lesson = "8f29a901-563a-4b6f-b5ed-c612aca12294.html";
  var certificate = "ece14c8c-670e-4242-80cf-159dc01c2f85.html";
  var stats = "4f9dfd93-7043-45df-a6a5-01fb37211903.html";
  var editor = "f8d834df-999a-49c0-b033-29b737dfa36b.html";
  var coursesMobile = "e3df40b4-07fe-48cc-83da-74b45c843303.html";
  var lessonMobile = "f8b33884-3c9d-44ac-886a-5f2c565d79ef.html";

  var pages = {
    "domů": home,
    "kurzy": courses,
    "certifikace": certificate,
    "certifikáty": certificate,
    "editor kurzů": editor,
    "statistiky": stats,
    "profesionální obsluha při výběru pánského obleku": course,
    "lekce 1": lesson,
    "závěrečný test": certificate,
    "13. závěrečný test": certificate,
    "přihlásit se": home,
    "pokračovat v kurzu": lesson,
    "pokračovat na lekci 2": lesson,
    "dokončit a pokračovat": certificate,
    "zpět na kurz": course,
    "zpět na osnovu": course,
    "osnova kurzu": course,
    "zobrazit osnovu": course,
    "zobrazit jako student": course,
    "katalog kurzů": courses,
    "zobrazit katalog": courses,
    "bandi – domů": home,
    "certifikát": certificate,
    "1. standard profesionální obsluhy": lesson,
    "2. první kontakt a vytvoření důvěry": lesson,
    "3. zjištění potřeb pomocí správných otázek": lesson,
    "4. svatba: ženich, svědek, host": lesson,
    "5. práce a business casual": lesson,
    "6. společenské události a dress code": lesson,
    "7. vedení zkoušky v kabince": lesson,
    "8. košile, kravata, boty: doplňkový prodej": lesson,
    "9. krejčovské úpravy a termín převzetí": lesson,
    "10. stížnost a reklamace": lesson,
    "11. zákazník bez rozhodnutí": lesson,
    "12. rozloučení a následná péče": lesson,
    "14. simulace rozhovoru se zákazníkem": lesson
  };

  var keys = Object.keys(pages).sort(function (a, b) { return b.length - a.length; });

  var here = location.pathname.split("/").pop();
  var narrow = window.matchMedia("(max-width: 760px)").matches;
  if (window.self === window.top) {
    if (narrow && here === courses) location.replace(coursesMobile);
    else if (narrow && here === lesson) location.replace(lessonMobile);
    else if (!narrow && here === coursesMobile) location.replace(courses);
    else if (!narrow && here === lessonMobile) location.replace(lesson);
  }

  function norm(value) {
    return (value || "").replace(/\s+/g, " ").trim().toLowerCase();
  }

  function bind(el, href) {
    if (!href || el.getAttribute("data-nav-bound")) return;
    el.setAttribute("data-nav-bound", "1");
    if (el.tagName === "A") el.setAttribute("href", href);
    else el.addEventListener("click", function () { location.href = href; });
  }

  function resolve(text) {
    var key = norm(text);
    if (!key) return null;
    if (pages[key]) return pages[key];
    for (var i = 0; i < keys.length; i++) {
      if (keys[i].length >= 12 && key.indexOf(keys[i]) === 0) return pages[keys[i]];
    }
    return null;
  }

  document.querySelectorAll("a, button").forEach(function (el) {
    bind(el, resolve(el.getAttribute("aria-label") || el.textContent));
  });

  document.querySelectorAll(".course-card").forEach(function (card) {
    var title = card.querySelector(".course-title, h2, h3");
    var key = norm(title && title.textContent);
    if (pages[key]) card.setAttribute("href", pages[key]);
  });
})();
