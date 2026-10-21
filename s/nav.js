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

  function login(event) {
    if (event) event.preventDefault();
    var email = document.getElementById("email");
    var pass = document.getElementById("pass");
    var error = document.getElementById("login-error");
    var ok = email && pass && norm(email.value) === "bandi@bandi.cz" && pass.value === "bandi";
    if (ok) location.href = home;
    else if (error) error.hidden = false;
  }

  var loginForm = document.querySelector("form");
  if (loginForm && document.getElementById("email") && document.getElementById("pass")) {
    loginForm.addEventListener("submit", login);
  }

  document.querySelectorAll("a, button").forEach(function (el) {
    if (norm(el.getAttribute("aria-label") || el.textContent) === "přihlásit se") {
      el.setAttribute("href", "#");
      el.addEventListener("click", login);
      return;
    }
    bind(el, resolve(el.getAttribute("aria-label") || el.textContent));
  });

  document.querySelectorAll(".course-card").forEach(function (card) {
    var title = card.querySelector(".course-title, h2, h3");
    var key = norm(title && title.textContent);
    if (pages[key]) card.setAttribute("href", pages[key]);
  });

  var side = document.querySelector("nav.sb");
  if (!side) return;

  var shellCss = document.createElement("style");
  shellCss.id = "m-shell";
  shellCss.textContent = [
    ".m-bar,.m-search,.m-nav-close{display:none}",
    "@media (max-width:760px){",
    ".m-bar{display:flex;position:sticky;top:0;z-index:40;flex:1 0 100%;align-items:center;justify-content:space-between;box-sizing:border-box;height:calc(64px + env(safe-area-inset-top));padding:env(safe-area-inset-top) max(4px,env(safe-area-inset-right)) 0 max(16px,env(safe-area-inset-left));background:#181210;color:#fff}",
    ".m-bar-logo{display:flex;align-items:center;min-width:0}",
    ".m-bar-logo img{height:28px;width:auto;display:block}",
    ".m-bar-actions{display:flex;align-items:center}",
    ".m-iconbtn,.m-nav-close,.m-search-cancel{border:0;background:transparent;color:inherit;cursor:pointer;font:inherit}",
    ".m-iconbtn{width:44px;height:44px;padding:0;display:inline-flex;align-items:center;justify-content:center}",
    ".m-iconbtn .bd-icon{width:22px;height:22px}",
    ".m-bar *:focus-visible{outline-color:#fff}",
    "nav.sb{display:none}",
    "nav.sb.is-open{display:flex;position:fixed;inset:0;z-index:60;width:100%;height:100%;max-width:none;flex:none;overflow:auto;-webkit-overflow-scrolling:touch;padding:calc(20px + env(safe-area-inset-top)) 16px calc(24px + env(safe-area-inset-bottom))}",
    "nav.sb.is-open .m-nav-close{display:inline-flex;position:absolute;top:calc(10px + env(safe-area-inset-top));right:max(8px,env(safe-area-inset-right));width:44px;height:44px;align-items:center;justify-content:center;color:#fff}",
    "nav.sb.is-open .m-nav-close .bd-icon{width:22px;height:22px}",
    "nav.sb.is-open .sb-logo{padding-left:48px;padding-right:48px}",
    ".m-search{display:flex;position:fixed;inset:0;z-index:70;flex-direction:column;box-sizing:border-box;background:#fff;color:#181210;padding-top:env(safe-area-inset-top)}",
    ".m-search[hidden]{display:none !important}",
    ".m-search-head{display:flex;align-items:center;gap:8px;padding:12px 8px 12px 16px;border-bottom:1px solid #e5e4e4}",
    ".m-search-head .input{flex:1;min-width:0}",
    ".m-search-cancel{height:44px;padding:0 12px;font-size:15px;font-weight:500;white-space:nowrap}",
    ".m-search-list{flex:1;overflow:auto;padding:8px 16px 32px}",
    ".m-search-hit{display:flex;align-items:center;min-height:48px;padding:8px 4px;border-bottom:1px solid #e5e4e4;color:#181210;text-decoration:none;font-size:15px;line-height:22px}",
    ".m-search-hit:hover{background:#f8f8f8}",
    ".m-search-empty{margin:16px 0;color:#4f4c4d;font-size:14px;line-height:22px}",
    "}",
    "html.m-lock,html.m-lock body{overflow:hidden}"
  ].join("");
  document.head.appendChild(shellCss);

  var logo = side.querySelector(".sb-logo img");
  var bar = document.createElement("div");
  bar.className = "m-bar";
  var markWrap = document.createElement("div");
  markWrap.className = "m-bar-logo";
  if (logo) {
    var mark = logo.cloneNode(true);
    mark.removeAttribute("style");
    if (!mark.getAttribute("alt")) mark.setAttribute("alt", "BANDI");
    markWrap.appendChild(mark);
  }
  var actions = document.createElement("div");
  actions.className = "m-bar-actions";
  var searchBtn = document.createElement("button");
  searchBtn.type = "button";
  searchBtn.className = "m-iconbtn m-search-open";
  searchBtn.setAttribute("aria-label", "Hledat");
  searchBtn.setAttribute("aria-expanded", "false");
  searchBtn.innerHTML = '<svg class="bd-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="7"></circle><path d="M20 20l-4-4"></path></svg>';
  var burger = document.createElement("button");
  burger.type = "button";
  burger.className = "m-iconbtn m-burger";
  burger.setAttribute("aria-label", "Menu");
  burger.setAttribute("aria-expanded", "false");
  burger.setAttribute("aria-controls", "m-menu");
  burger.innerHTML = '<svg class="bd-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"></path></svg>';
  actions.appendChild(searchBtn);
  actions.appendChild(burger);
  bar.appendChild(markWrap);
  bar.appendChild(actions);
  side.parentNode.insertBefore(bar, side);
  if (!side.id) side.id = "m-menu";

  var closeBtn = document.createElement("button");
  closeBtn.type = "button";
  closeBtn.className = "m-nav-close";
  closeBtn.setAttribute("aria-label", "Zavřít menu");
  closeBtn.innerHTML = '<svg class="bd-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"></path></svg>';
  side.appendChild(closeBtn);

  var search = document.createElement("div");
  search.className = "m-search";
  search.id = "m-search";
  search.hidden = true;
  search.setAttribute("role", "dialog");
  search.setAttribute("aria-modal", "true");
  search.setAttribute("aria-label", "Hledat");
  search.innerHTML = '<div class="m-search-head"><input class="input m-search-input" type="search" placeholder="Hledat" aria-label="Hledat" autocomplete="off"><button type="button" class="m-search-cancel">Zrušit</button></div><div class="m-search-list"></div>';
  document.body.appendChild(search);
  var input = search.querySelector(".m-search-input");
  var results = search.querySelector(".m-search-list");

  function narrow() {
    return window.matchMedia("(max-width: 760px)").matches;
  }

  function lock() {
    var open = side.classList.contains("is-open") || !search.hidden;
    document.documentElement.classList.toggle("m-lock", open);
  }

  function setMenu(open) {
    var show = !!open && narrow();
    side.classList.toggle("is-open", show);
    burger.setAttribute("aria-expanded", show ? "true" : "false");
    if (show) search.hidden = true;
    searchBtn.setAttribute("aria-expanded", "false");
    lock();
    if (show) closeBtn.focus();
  }

  function setSearch(open) {
    var show = !!open && narrow();
    search.hidden = !show;
    searchBtn.setAttribute("aria-expanded", show ? "true" : "false");
    if (show) {
      side.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      input.value = "";
      paintResults();
      input.focus();
    }
    lock();
  }

  function linkName(anchor) {
    var name = anchor.textContent || "";
    var kbd = anchor.querySelector(".sb-kbd");
    if (kbd) name = name.replace(kbd.textContent, "");
    return name.replace(/\s+/g, " ").trim();
  }

  function entries() {
    var list = [];
    var seen = {};
    function add(name, href) {
      name = (name || "").replace(/\s+/g, " ").trim();
      var key = norm(name);
      if (!key || seen[key]) return;
      seen[key] = 1;
      list.push({ name: name, href: href && href !== "#" ? href : "" });
    }
    side.querySelectorAll("a.sb-link").forEach(function (anchor) {
      var name = linkName(anchor);
      if (norm(name).indexOf("vyhledávání") === 0) return;
      add(name, anchor.getAttribute("href"));
    });
    document.querySelectorAll("a.course-card").forEach(function (card) {
      var title = card.querySelector(".course-title, h2, h3");
      add(title ? title.textContent : "", card.getAttribute("href"));
    });
    return list;
  }

  function paintResults() {
    while (results.firstChild) results.removeChild(results.firstChild);
    var query = norm(input.value);
    if (!query) return;
    var found = entries().filter(function (item) {
      return norm(item.name).indexOf(query) !== -1;
    });
    if (!found.length) {
      var empty = document.createElement("p");
      empty.className = "m-search-empty";
      empty.textContent = "Nic jsme nenašli.";
      results.appendChild(empty);
      return;
    }
    found.forEach(function (item) {
      var row = document.createElement(item.href ? "a" : "div");
      row.className = "m-search-hit";
      row.textContent = item.name;
      if (item.href) row.setAttribute("href", item.href);
      results.appendChild(row);
    });
  }

  burger.addEventListener("click", function () {
    setMenu(!side.classList.contains("is-open"));
  });
  closeBtn.addEventListener("click", function () {
    setMenu(false);
    burger.focus();
  });
  searchBtn.addEventListener("click", function () {
    setSearch(search.hidden);
  });
  search.querySelector(".m-search-cancel").addEventListener("click", function () {
    setSearch(false);
    searchBtn.focus();
  });
  input.addEventListener("input", paintResults);
  side.querySelectorAll("a.sb-link").forEach(function (anchor) {
    if (norm(linkName(anchor)).indexOf("vyhledávání") !== 0) return;
    anchor.addEventListener("click", function (event) {
      if (!narrow()) return;
      event.preventDefault();
      setSearch(true);
    });
  });
  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape" || !narrow()) return;
    if (!search.hidden) setSearch(false);
    else if (side.classList.contains("is-open")) setMenu(false);
  });
  window.addEventListener("resize", function () {
    if (narrow()) return;
    side.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    search.hidden = true;
    searchBtn.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("m-lock");
  });
})();
