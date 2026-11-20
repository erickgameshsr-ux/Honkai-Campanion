/* Honkai Companion — rendu, navigation, sauvegarde. Aucun framework. */
(() => {
  "use strict";
  const KEY = "honkai-companion-v1";
  const $ = (s) => document.querySelector(s);
  const esc = (v) => String(v ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  // N'autorise que http(s) pour les liens.
  const safeUrl = (u) => (/^https?:\/\//i.test(u || "") ? esc(u) : "");
  const link = (u, t) => (safeUrl(u) ? `<a href="${safeUrl(u)}" target="_blank" rel="noopener noreferrer">${esc(t)}</a>` : "");

  /* ---- État + localStorage ---- */
  let state = { checks: {}, lastSeenLog: "" };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s.checks === "object") state = { checks: s.checks, lastSeenLog: s.lastSeenLog || "" }; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  /* ---- Onglets ---- */
  const TABS = [
    { id: "accueil", nom: "Accueil", subs: [] },
    { id: "builds", nom: "Builds & Personnages", groupe: "Guides", subs: [["main", "Builds optimisés"], ["astuces", "Astuces de base"]] },
    { id: "taches", nom: "Tâches & Checklists", groupe: "Progression", subs: [["main", "Récurrentes"], ["maj", "MAJ actuelle"], ["old", "Précédentes MAJ"]] },
    { id: "ressources", nom: "Ressources conseillées", groupe: "Liens", subs: [["main", "Sites conseillés"], ["yt", "Chaînes YouTube"]] },
    { id: "veille", nom: "Bêta & Futures infos", groupe: "Veille", subs: [["main", "Infos de la bêta"], ["futur", "Moyen-long terme"]] }
  ];
  let cur = { tab: "accueil", sub: "main" };
  const latestLog = () => (DATA_ACCUEIL.log[0] || {}).id || "";
  const hasNew = () => latestLog() && state.lastSeenLog !== latestLog();

  function renderNav() {
    let html = "", last = "";
    TABS.forEach((t) => {
      if (t.groupe && t.groupe !== last) { html += `<div class="nav-group">${esc(t.groupe)}</div>`; last = t.groupe; }
      const badge = t.id === "accueil" && hasNew() ? '<span class="badge b-new">Nouveau</span>' : "";
      html += `<button class="nav-item" data-tab="${t.id}" ${cur.tab === t.id ? 'aria-current="page"' : ""}>${esc(t.nom)}${badge}</button>`;
    });
    $("#sidebar").innerHTML = html;
  }

  /* ---- Rendus ---- */
  const card = (h) => `<article class="card">${h}</article>`;
  const badges = (arr) => `<div class="badges">${arr.filter(Boolean).join("")}</div>`;

  function vAccueil() {
    const A = DATA_ACCUEIL;
    return `<h1>Accueil</h1>
    <section class="section"><h2>Actualités</h2><div class="grid">${A.actus.map((a) => card(`<h3>${esc(a.titre)}</h3><p class="muted">${esc(a.date)}</p><p>${esc(a.texte)}</p>${link(a.lien, "Lire la suite")}`)).join("")}</div></section>
    <section class="section"><h2>Événements en cours</h2><div class="grid">${A.events.map((e) => card(`<h3>${esc(e.titre)}</h3><p class="muted">Du ${esc(e.debut)} au ${esc(e.fin)}</p><p>${esc(e.infos)}</p>`)).join("")}</div></section>
    <section class="section"><h2>Codes promotionnels</h2><div class="grid">${A.codes.map((c) => card(`<div class="code"><code>${esc(c.code)}</code><button class="btn" data-copy="${esc(c.code)}">Copier</button></div><p>${esc(c.recompense)}</p><p class="muted">Expire le ${esc(c.expire)}</p>`)).join("")}</div></section>
    <section class="section"><h2>Nouveautés du site</h2>${A.log.map((l, i) => card(`<h3>${esc(l.titre)} ${i === 0 && hasNew() ? '<span class="badge b-new">Nouveau</span>' : ""}</h3><p class="muted">${esc(l.date)}</p><p>${esc(l.texte)}</p>`)).join("")}</section>`;
  }

  function vBuilds(sub) {
    if (sub === "astuces") return `<div class="grid">${DATA_BUILDS.astuces.map((a) => card(`<h3>${esc(a.titre)}</h3><p>${esc(a.texte)}</p>`)).join("")}</div>`;
    const roles = [...new Set(DATA_BUILDS.builds.map((b) => b.element))];
    return `<div class="toolbar"><input type="search" id="q" placeholder="Rechercher un personnage" aria-label="Rechercher"><select id="f" aria-label="Filtrer par élément"><option value="">Tous les éléments</option>${roles.map((r) => `<option>${esc(r)}</option>`).join("")}</select></div><div class="grid" id="builds-list"></div>`;
  }
  function buildCards() {
    const q = ($("#q").value || "").toLowerCase(), f = $("#f").value;
    $("#builds-list").innerHTML = DATA_BUILDS.builds.filter((b) => b.nom.toLowerCase().includes(q) && (!f || b.element === f)).map((b) => card(
      `<div class="banner" ${safeUrl(b.image) ? `style="background-image:url('${safeUrl(b.image)}')"` : ""}>${esc(b.role)}</div>
      ${badges([`<span class="badge b-rarete">${esc(b.rarete)}</span>`, `<span class="badge b-element">${esc(b.element)}</span>`, `<span class="badge b-tier">Tier ${esc(b.tier)}</span>`])}
      <h3>${esc(b.nom)}</h3><dl class="stats">${Object.entries(b.stats || {}).map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
      <p><strong>Sets :</strong> ${esc(b.sets)}</p><p class="muted">${esc(b.notes)}</p>
      <div class="row">${(b.videos || []).map((v) => link(v.url, "▶ " + v.titre)).join("")}</div>`)).join("") || '<p class="muted">Aucun résultat. Modifiez la recherche ou le filtre.</p>';
  }

  const IMG_DIR = "assets/taches/"; // dossier des images de guides (ITA1.jpg ... ITA17.jpg)
  const checkItem = (it) => `<div class="task ${it.badge ? "alt" : ""}"><label class="check ${state.checks[it.id] ? "done" : ""}"><input type="checkbox" data-id="${esc(it.id)}" ${state.checks[it.id] ? "checked" : ""}><span><span class="lbl">${esc(it.label)}</span>${it.badge ? `<span class="badge b-rarete">${esc(it.badge)}</span>` : ""}${it.tip ? `<span class="tip">${esc(it.tip)}</span>` : ""}${it.video ? `<span class="tip">${link(it.video, "▶ Vidéo")}</span>` : ""}</span></label>${it.guide ? `<button class="btn guide-btn" data-guide="${esc(it.id)}">Guide</button>` : ""}</div>`;
  const progress = (items) => { const n = items.filter((i) => state.checks[i.id]).length; return `<p class="muted" data-prog>${n} / ${items.length} terminées</p><div class="progress"><i style="width:${items.length ? (n / items.length) * 100 : 0}%"></i></div>`; };

  const FREQ = [["quotidienne", "Quotidiennes"], ["hebdo", "Hebdomadaires / Bi-hebdomadaires"], ["mensuelle", "Mensuelles / MÀJ (~43 j)"]];
  function vTaches(sub) {
    const T = DATA_TACHES;
    if (sub === "maj") return `<h2>Mise à jour ${esc(T.majActuelle.version)}</h2>${progress(T.majActuelle.items)}${T.majActuelle.items.map(checkItem).join("")}`;
    if (sub === "old") return T.majPrecedentes.map((m) => `<h2>Mise à jour ${esc(m.version)}</h2>${m.items.map(checkItem).join("")}`).join("");
    return FREQ.map(([f, nom]) => {
      const items = T.recurrentes.filter((i) => i.freq === f);
      return `<section class="section"><div class="row" style="justify-content:space-between;align-items:center"><h2>${nom}</h2><button class="btn ghost" data-reset="${f}">Réinitialiser</button></div>${progress(items)}${items.map(checkItem).join("")}</section>`;
    }).join("");
  }

  /* ---- Fenêtre « Guide » (créée à la demande, n'alourdit pas la liste) ---- */
  function guideHtml(blocs) {
    return blocs.map((b) => {
      if (b[0] === "h") return `<h3>${esc(b[1])}</h3>`;
      if (b[0] === "p") return `<p>${esc(b[1])}</p>`;
      if (b[0] === "ul") return `<ul>${b[1].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
      if (b[0] === "img") return `<figure><img src="${IMG_DIR}${esc(b[1])}.jpg" data-name="${esc(b[1])}" data-ext="jpg" alt="${esc(b[2] || b[1])}" loading="lazy">${b[2] ? `<figcaption>${esc(b[2])}</figcaption>` : ""}</figure>`;
      return "";
    }).join("");
  }
  let gdlg;
  function openGuide(id) {
    const t = DATA_TACHES.recurrentes.find((x) => x.id === id);
    if (!t || !t.guide) return;
    if (!gdlg) {
      gdlg = document.createElement("dialog");
      gdlg.className = "guide";
      gdlg.setAttribute("aria-labelledby", "guide-title");
      document.body.appendChild(gdlg);
      // Fermeture : bouton ✕ ou clic sur le fond
      gdlg.addEventListener("click", (e) => { if (e.target === gdlg || e.target.closest("[data-close-guide]")) gdlg.close(); });
    }
    gdlg.innerHTML = `<div class="guide-head"><h2 id="guide-title">${esc(t.label)}</h2><button class="btn" data-close-guide aria-label="Fermer">✕</button></div><div class="guide-body">${guideHtml(t.guide)}</div>`;
    gdlg.showModal();
  }

  function vRessources(sub) {
    if (typeof RESSOURCES_DATA === "undefined") return '<p class="muted">Les données des ressources sont introuvables. Vérifiez que data-ressources.js est bien présent et à jour.</p>';
    const R = RESSOURCES_DATA;
    if (sub === "yt") {
      return `<p class="muted">${esc(R.youtubeNote)}</p>
      <div class="grid">${R.chainesYoutube.map((c) => card(
        `<div class="chan">
          ${safeUrl(c.avatar) ? `<img class="avatar" src="${safeUrl(c.avatar)}" alt="" loading="lazy" referrerpolicy="no-referrer">` : ""}
          <h3>${esc(c.nom)}</h3>
        </div>
        ${c.leaks ? badges(['<span class="badge b-leaks">Leaks</span>']) : ""}
        <p>${esc(c.description)}</p>
        ${link(c.url, "Ouvrir la chaîne")}`)).join("")}</div>`;
    }
    return `<div class="grid">${R.sites.map((s) => card(
      `${badges([`<span class="badge b-element">${esc(s.categorie)}</span>`])}
      <h3>${esc(s.nom)}</h3><p>${esc(s.description)}</p>
      ${link(s.url, "Ouvrir le site")}`)).join("")}</div>`;
  }

  // Images : avatar masqué si cassé ; image de guide → essai .webp puis emplacement indicatif
  document.addEventListener("error", (e) => {
    const im = e.target; if (!im || !im.classList) return;
    if (im.classList.contains("avatar")) { im.style.visibility = "hidden"; return; }
    if (im.tagName === "IMG" && im.dataset.ext === "jpg") { im.dataset.ext = "webp"; im.src = IMG_DIR + im.dataset.name + ".webp"; }
    else if (im.tagName === "IMG" && im.dataset.ext === "webp") {
      const d = document.createElement("div"); d.className = "img-ph";
      d.textContent = "Image à ajouter : " + IMG_DIR + im.dataset.name + ".jpg (ou .webp)"; im.replaceWith(d);
    }
  }, true);

  function vVeille(sub) {
    const list = sub === "futur" ? DATA_VEILLE.futur : DATA_VEILLE.beta;
    return `<div class="grid">${list.map((x) => card(`${badges([`<span class="badge b-tier">${esc(x.statut)}</span>`])}<h3>${esc(x.titre)}</h3><p class="muted">${esc(x.date)}</p><p>${esc(x.texte)}</p>`)).join("")}</div>`;
  }

  function render() {
    const tab = TABS.find((t) => t.id === cur.tab);
    const pills = tab.subs.length ? `<div class="pills" role="tablist">${tab.subs.map(([id, n]) => `<button class="pill" role="tab" data-sub="${id}" aria-selected="${cur.sub === id}">${esc(n)}</button>`).join("")}</div>` : "";
    const body = { accueil: vAccueil, builds: vBuilds, taches: vTaches, ressources: vRessources, veille: vVeille }[cur.tab](cur.sub);
    $("#view").innerHTML = `<div class="fade">${cur.tab === "accueil" ? "" : `<h1>${esc(tab.nom)}</h1>`}${pills}${body}</div>`;
    if (cur.tab === "builds" && cur.sub === "main") { buildCards(); $("#q").oninput = buildCards; $("#f").onchange = buildCards; }
    if (cur.tab === "accueil") { state.lastSeenLog = latestLog(); save(); } // le badge disparaît au prochain affichage
    renderNav();
  }
  const go = (tab, sub = "main") => { cur = { tab, sub }; render(); closeDrawer(); window.scrollTo(0, 0); };

  /* ---- Tiroir mobile ---- */
  const openDrawer = () => { $("#sidebar").classList.add("open"); $("#scrim").classList.add("show"); $("#burger").setAttribute("aria-expanded", "true"); };
  function closeDrawer() { $("#sidebar").classList.remove("open"); $("#scrim").classList.remove("show"); $("#burger").setAttribute("aria-expanded", "false"); }
  $("#burger").onclick = () => ($("#sidebar").classList.contains("open") ? closeDrawer() : openDrawer());
  $("#scrim").onclick = closeDrawer;
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeDrawer(); });

  /* ---- Événements délégués ---- */
  document.addEventListener("click", (e) => {
    const t = e.target.closest("[data-tab],[data-sub],[data-copy],[data-reset],[data-guide]");
    if (!t) return;
    if (t.dataset.tab) go(t.dataset.tab);
    else if (t.dataset.sub) go(cur.tab, t.dataset.sub);
    else if (t.dataset.copy) copy(t.dataset.copy, t);
    else if (t.dataset.guide) openGuide(t.dataset.guide);
    else if (t.dataset.reset) { DATA_TACHES.recurrentes.filter((i) => i.freq === t.dataset.reset).forEach((i) => delete state.checks[i.id]); save(); render(); }
  });
  document.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.id; if (!id) return;
    if (e.target.checked) state.checks[id] = true; else delete state.checks[id];
    save(); const lab = e.target.closest(".check"); lab.classList.toggle("done", e.target.checked);
    render_progressOnly();
  });
  function render_progressOnly() { const y = window.scrollY; render(); window.scrollTo(0, y); }

  function copy(text, btn) {
    const ok = () => { const o = btn.textContent; btn.textContent = "Copié ✓"; btn.classList.add("copied"); setTimeout(() => { btn.textContent = o; btn.classList.remove("copied"); }, 1400); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, () => fallback());
    else fallback();
    function fallback() { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} ta.remove(); }
  }

  /* ---- Export / Import ---- */
  const dlg = $("#dlg-save"), msg = (t, bad) => { const m = $("#save-msg"); m.textContent = t; m.style.color = bad ? "var(--bad)" : "var(--ok)"; };
  $("#btn-save").onclick = () => { $("#save-text").value = ""; msg(""); dlg.showModal(); };
  $("#btn-close").onclick = () => dlg.close();
  $("#btn-export").onclick = () => { $("#save-text").value = JSON.stringify({ app: "honkai-companion", v: 1, checks: state.checks }); $("#save-text").select(); msg("Code généré. Copiez-le pour le coller sur un autre appareil."); };
  $("#btn-import").onclick = () => {
    try {
      const d = JSON.parse($("#save-text").value);
      if (d.app !== "honkai-companion" || !d.checks || typeof d.checks !== "object" || Array.isArray(d.checks)) throw new Error();
      const clean = {}; Object.keys(d.checks).forEach((k) => { if (d.checks[k] === true) clean[k] = true; });
      state.checks = clean; save(); render(); msg("Sauvegarde importée avec succès.");
    } catch (e) { msg("Code invalide : collez le texte exporté depuis ce site, sans le modifier.", true); }
  };

  render();
})();
