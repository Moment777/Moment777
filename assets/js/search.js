(function () {
  "use strict";
  var input = document.getElementById("search-input");
  var out = document.getElementById("search-results");
  var status = document.getElementById("search-status");
  var base = input.getAttribute("data-index");
  var docs = {}, idx = null;

  function esc(s) { return s.replace(/[&<>"']/g, function (c) { return ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})[c]; }); }

  function snippet(text, terms) {
    var lower = text.toLowerCase(), pos = -1;
    for (var i = 0; i < terms.length && pos < 0; i++) pos = lower.indexOf(terms[i]);
    var start = Math.max(0, pos - 60);
    var s = esc(text.substr(start, 180));
    terms.forEach(function (t) {
      s = s.replace(new RegExp("(" + t.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + ")", "gi"), "<mark>$1</mark>");
    });
    return (start > 0 ? "…" : "") + s + "…";
  }

  function run() {
    var q = input.value.trim();
    out.innerHTML = "";
    if (!idx || q.length < 2) { status.textContent = q ? "Keep typing…" : "Search titles, tags and article text."; return; }
    var terms = q.toLowerCase().split(/\s+/).filter(Boolean);
    var results;
    try {
      results = idx.query(function (query) {
        terms.forEach(function (t) {
          query.term(t, { boost: 10 });
          query.term(t, { wildcard: lunr.Query.wildcard.TRAILING, boost: 3 });
        });
      });
    } catch (e) { results = []; }
    status.textContent = results.length + (results.length === 1 ? " result" : " results") + ' for "' + q + '"';
    results.slice(0, 20).forEach(function (r) {
      var d = docs[r.ref];
      var div = document.createElement("div");
      div.className = "hit";
      div.innerHTML = '<h3><a href="' + esc(d.url) + '">' + esc(d.title) + '</a></h3>' +
        '<p>' + snippet(d.content, terms) + '</p>' +
        '<ul class="tags"><li>' + esc(d.category) + '</li>' + d.tags.split(" ").filter(Boolean).map(function (t) { return "<li>#" + esc(t) + "</li>"; }).join("") + '</ul>';
      out.appendChild(div);
    });
  }

  fetch(base).then(function (r) { return r.json(); }).then(function (data) {
    data.forEach(function (d) { docs[d.id] = d; });
    idx = lunr(function () {
      this.ref("id");
      this.field("title", { boost: 10 });
      this.field("tags", { boost: 6 });
      this.field("category");
      this.field("content");
      data.forEach(function (d) { this.add(d); }, this);
    });
    var initial = new URLSearchParams(location.search).get("q");
    if (initial) input.value = initial;
    run();
  }).catch(function () { status.textContent = "Could not load the search index."; });

  input.addEventListener("input", run);
  input.focus();
})();
