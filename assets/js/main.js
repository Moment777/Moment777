(function () {
  "use strict";

  /* 1. Table of contents, built from the article's h2/h3 headings */
  function buildToc() {
    var list = document.getElementById("toc-list");
    var body = document.getElementById("post-content");
    if (!list || !body) return;
    var heads = body.querySelectorAll("h2[id], h3[id]");
    if (heads.length < 2) { list.closest(".toc").style.display = "none"; return; }

    var currentTop = null;
    heads.forEach(function (h) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "#" + h.id;
      a.textContent = h.textContent;
      li.appendChild(a);
      if (h.tagName === "H2") {
        list.appendChild(li);
        currentTop = li;
      } else {
        var parent = currentTop || list;
        var sub = currentTop ? currentTop.querySelector("ol") : null;
        if (currentTop && !sub) { sub = document.createElement("ol"); currentTop.appendChild(sub); }
        (sub || list).appendChild(li);
      }
    });

    // Highlight the section being read
    if ("IntersectionObserver" in window) {
      var links = {};
      list.querySelectorAll("a").forEach(function (a) { links[a.getAttribute("href").slice(1)] = a; });
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          if (e.isIntersecting) {
            Object.keys(links).forEach(function (k) { links[k].classList.remove("current"); });
            links[e.target.id].classList.add("current");
          }
        });
      }, { rootMargin: "-10% 0px -80% 0px" });
      heads.forEach(function (h) { io.observe(h); });
    }
  }

  /* 2. Language label + copy button on every code block */
  function enhanceCode() {
    document.querySelectorAll("div.highlighter-rouge").forEach(function (block) {
      var m = block.className.match(/language-([\w+-]+)/);
      block.setAttribute("data-lang", m ? m[1] : "text");

      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "copy-btn";
      btn.textContent = "Copy";
      btn.addEventListener("click", function () {
        var pre = block.querySelector("pre").cloneNode(true);
        // For `console` blocks copy only the commands: drop prompts and output
        pre.querySelectorAll(".gp, .go").forEach(function (n) { n.remove(); });
        var text = pre.textContent;
        if (block.querySelector(".gp")) {
          // output lines were removed, so keep only non-empty command lines
          text = text.split("\n").map(function (l) { return l.replace(/^\s+/, ""); }).filter(Boolean).join("\n");
        }
        navigator.clipboard.writeText(text.replace(/\n+$/, "")).then(function () {
          btn.textContent = "Copied"; btn.classList.add("done");
          setTimeout(function () { btn.textContent = "Copy"; btn.classList.remove("done"); }, 1500);
        });
      });
      block.appendChild(btn);
    });
  }

  /* 3. Press "/" anywhere to jump to search */
  function searchShortcut() {
    document.addEventListener("keydown", function (e) {
      var t = e.target.tagName;
      if (e.key === "/" && t !== "INPUT" && t !== "TEXTAREA") {
        var box = document.getElementById("search-input") || document.getElementById("header-search");
        if (box) { e.preventDefault(); box.focus(); }
      }
    });
  }

  buildToc();
  enhanceCode();
  searchShortcut();
})();
