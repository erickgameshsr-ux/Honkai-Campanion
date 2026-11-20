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
  let state = { checks: {}, lastSeenLog: "", periods: {}, star: "" };
  try { const s = JSON.parse(localStorage.getItem(KEY)); if (s && typeof s.checks === "object") state = { checks: s.checks, lastSeenLog: s.lastSeenLog || "", periods: s.periods || {}, star: typeof s.star === "string" ? s.star : "" }; } catch (e) {}
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {} };

  /* ---- Onglets ---- */
  const TABS = [
    { id: "accueil", nom: "Actualités", subs: [] },
    { id: "builds", nom: "Personnages", groupe: "Guides", subs: [["main", "Personnages"], ["astuces", "Astuces de base"]] },
    { id: "tutos", nom: "Tutos", groupe: "Guides", subs: [] },
    { id: "taches", nom: "Tâches & Checklists", groupe: "Progression", subs: [["main", "Récurrentes"], ["maj", "MAJ"]] },
    { id: "ressources", nom: "Ressources conseillées", groupe: "Liens", subs: [["main", "Sites conseillés"], ["yt", "Chaînes YouTube"]] },
  ];
  let cur = { tab: "accueil", sub: "main" };
  const latestLog = () => ((DATA_ACCUEIL.log || [])[0] || {}).id || "";
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

  /* ---- Accueil : actualités uniquement ---- */
  function vAccueil() {
    return `<h1>Actualités</h1><div class="grid">${DATA_ACCUEIL.actus.map((a) => card(`<h3>${esc(a.titre)}</h3><p class="muted">${esc(a.date)}</p><p>${esc(a.texte)}</p>${link(a.lien, "Lire la suite")}`)).join("")}</div>`;
  }

  /* ---- Personnages : filtres Voies/Types, bulles cliquables, carte détaillée ---- */
  let pf = { q: "", voie: "", type: "", open: false, sel: "" };
  const chip = (kind, o) => `<button class="chip ${pf[kind] === o.id ? "on" : ""}" data-f="${kind}" data-v="${esc(o.id)}">${safeUrl(o.icone) ? `<img src="${safeUrl(o.icone)}" alt="" data-hide referrerpolicy="no-referrer">` : ""}${esc(o.id)}</button>`;
  const filtersHtml = () => `<div class="frow"><b>Voies</b><div class="fscroll">${DATA_BUILDS.voies.map((o) => chip("voie", o)).join("")}</div></div><div class="frow"><b>Types</b><div class="fscroll">${DATA_BUILDS.types.map((o) => chip("type", o)).join("")}</div></div>`;

  function vBuilds(sub) {
    if (sub === "astuces") return `<div class="grid">${DATA_BUILDS.astuces.map((a) => card(`<h3>${esc(a.titre)}</h3><p>${esc(a.texte)}</p>`)).join("")}</div>`;
    return `<div id="perso-zone"><div class="toolbar"><input type="search" id="q" placeholder="Rechercher un personnage" aria-label="Rechercher" value="${esc(pf.q)}"><button class="btn" id="ftoggle" aria-expanded="${pf.open}">Voies &amp; Types ▾</button><button class="btn ghost" data-freset>Réinitialiser</button></div><div id="fpanel" class="fpanel"></div><div id="bubbles" class="bubbles"></div></div>`;
  }
  const bubbleHtml = (p) => `<button class="bubble" data-p="${esc(p.id)}" title="${esc(p.nom)}" aria-label="${esc(p.nom)}">${state.star === p.id ? '<b class="star-mark">★</b>' : ""}${safeUrl(p.icone) ? `<img src="${safeUrl(p.icone)}" alt="" loading="lazy" data-hide referrerpolicy="no-referrer">` : `<i class="bub-ph">${esc((p.nom || "?")[0])}</i>`}<span>${esc(p.nom)}</span></button>`;
  const openPerso = (id) => { const p = DATA_BUILDS.persos.find((x) => x.id === id); if (p) openDialog("Fiche personnage", cardHtml(p)); };
  // Met à jour les vues qui affichent l'objectif ★
  function refreshStar() {
    if (cur.tab === "builds" && cur.sub === "main") paintPersos();
    else if (cur.tab === "taches" && cur.sub === "main") render_progressOnly();
  }
  // Bulle de l'objectif ★, affichée sous « Entraînement Quotidien » (rien si aucun objectif)
  const starBlock = () => { const p = DATA_BUILDS.persos.find((x) => x.id === state.star); return p ? `<div class="star-goal"><span class="muted">★ Objectif d'amélioration</span>${bubbleHtml(p)}</div>` : ""; };
  function cardHtml(p) {
    const on = state.star === p.id;
    const sets = (p.sets || []).slice(0, 2).map((u) => (safeUrl(u) ? `<img class="set-icon" src="${safeUrl(u)}" alt="Set de reliques" loading="lazy" data-hide referrerpolicy="no-referrer">` : "")).join("");
    const vids = (p.videos || []).slice(0, 3).map((u, i) => link(u, "▶ Vidéo " + (i + 1))).filter(Boolean).join("");
    return `<button class="btn star-btn ${on ? "on" : ""}" data-star="${esc(p.id)}" aria-pressed="${on}">★ Objectif d'amélioration</button><h3>Sets de reliques</h3><div class="sets">${sets || '<span class="muted">À renseigner.</span>'}</div><h3>Notes</h3><p class="notes">${esc(p.notes)}</p><h3>Guide Vidéo</h3><div class="row">${vids || '<span class="muted">Aucun lien pour le moment.</span>'}</div>`;
  }
  function paintPersos() {
    $("#fpanel").innerHTML = filtersHtml();
    $("#fpanel").hidden = !pf.open;
    $("#ftoggle").setAttribute("aria-expanded", String(pf.open));
    const q = pf.q.toLowerCase();
    const list = DATA_BUILDS.persos.filter((p) => p.nom.toLowerCase().includes(q) && (!pf.voie || p.voie === pf.voie) && (!pf.type || p.type === pf.type));
    $("#bubbles").innerHTML = list.map(bubbleHtml).join("") || '<p class="muted">Aucun personnage. Modifiez la recherche ou les filtres.</p>';
  }
  function initPersos() {
    paintPersos();
    $("#q").oninput = (e) => { pf.q = e.target.value; paintPersos(); };
    $("#perso-zone").onclick = (e) => {
      const t = e.target.closest("[data-f],[data-freset],#ftoggle"); if (!t) return;
      if (t.dataset.f) pf[t.dataset.f] = pf[t.dataset.f] === t.dataset.v ? "" : t.dataset.v;
      else if (t.hasAttribute("data-freset")) { pf.q = ""; pf.voie = ""; pf.type = ""; $("#q").value = ""; }
      else if (t.id === "ftoggle") pf.open = !pf.open;
      paintPersos();
    };
  }

  /* ---- Tutos ---- */
  function vTutos() {
    const t = DATA_BUILDS.tutos || [];
    return t.length ? `<div class="grid">${t.map((x) => card(`<h3>${esc(x.titre)}</h3><p>${esc(x.resume)}</p>${(x.etapes || []).length ? `<ol>${x.etapes.map((e) => `<li>${esc(e)}</li>`).join("")}</ol>` : ""}${link(x.video, "▶ Vidéo")}`)).join("")}</div>` : '<p class="muted">Aucun tuto pour le moment.</p>';
  }

  const IMG_DIR = "assets/taches/"; // dossier des images de guides (ITA1.jpg ... ITA17.jpg)
  const checkItem = (it) => `<div class="task ${it.badge ? "alt" : ""}"><label class="check ${state.checks[it.id] ? "done" : ""}"><input type="checkbox" data-id="${esc(it.id)}" ${state.checks[it.id] ? "checked" : ""}><span><span class="lbl">${esc(it.label)}</span>${it.badge ? `<span class="badge b-rarete">${esc(it.badge)}</span>` : ""}${it.cycle ? `<span class="tip cd" data-cd="${it.cycle}">${cdText(it.cycle)}</span>` : ""}${it.tip ? `<span class="tip">${esc(it.tip)}</span>` : ""}${it.video ? `<span class="tip">${link(it.video, "▶ Vidéo")}</span>` : ""}</span></label>${it.guide ? `<button class="btn guide-btn" data-guide="${esc(it.id)}">Guide</button>` : ""}</div>`;
  const progress = (items) => { const n = items.filter((i) => state.checks[i.id]).length; return `<p class="muted" data-prog>${n} / ${items.length} terminées</p><div class="progress"><i style="width:${items.length ? (n / items.length) * 100 : 0}%"></i></div>`; };

  const FREQ = [["quotidienne", "Quotidiennes"], ["hebdo", "Hebdomadaires / Bi-hebdomadaires"], ["mensuelle", "Mensuelles / MÀJ"]];
  function vTaches(sub) {
    if (sub === "maj") return vMaj();
    return FREQ.map(([f, nom]) => {
      const items = DATA_TACHES.recurrentes.filter((i) => i.freq === f);
      return `<section class="section"><div class="row" style="justify-content:space-between;align-items:center"><h2>${nom} <span class="muted cd" data-cd="${f}">${cdText(f)}</span></h2><button class="btn ghost" data-reset="${f}">Réinitialiser</button></div>${progress(items)}${items.map((it) => checkItem(it) + (it.id === "q-entrainement" ? starBlock() : "")).join("")}</section>`;
    }).join("");
  }

  /* ---- MAJ : un post par version, avec cases à cocher intégrées ---- */
  const blocHtml = (b) => {
    if (b[0] === "h") return `<h3>${esc(b[1])}</h3>`;
    if (b[0] === "p") return `<p>${esc(b[1])}</p>`;
    if (b[0] === "ul") return `<ul>${b[1].map((x) => `<li>${esc(x)}</li>`).join("")}</ul>`;
    if (b[0] === "check") return checkItem({ id: b[1], label: b[2], tip: b[3] || "" });
    if (b[0] === "video") return `<p>${link(b[1], "▶ " + (b[2] || "Vidéo"))}</p>`;
    if (b[0] === "img") return `<figure><img src="${esc(b[1])}" alt="${esc(b[2] || "")}" loading="lazy" data-ph data-name="${esc(b[1])}">${b[2] ? `<figcaption>${esc(b[2])}</figcaption>` : ""}</figure>`;
    return "";
  };
  function vMaj() {
    const posts = DATA_TACHES.maj || [];
    if (!posts.length) return '<p class="muted">Aucune mise à jour pour le moment.</p>';
    return posts.map((p, i) => {
      const ids = p.blocs.filter((b) => b[0] === "check").map((b) => b[1]);
      const n = ids.filter((id) => state.checks[id]).length;
      return `<details class="post card" ${i === 0 ? "open" : ""}><summary><strong>Version ${esc(p.version)}</strong><span class="muted">${esc(p.date || "")}</span>${ids.length ? `<span class="badge b-tier post-count">${n}/${ids.length}</span>` : ""}</summary><div class="post-body">${p.blocs.map(blocHtml).join("")}</div></details>`;
    }).join("");
  }

  /* ---- Réinitialisation automatique (heure du serveur de jeu) ---- */
  const DAY = 864e5, HOUR = 36e5, CYCLES = ["quotidienne", "hebdo", "bihebdo", "mensuelle", "maj"];
  const cycleOf = (t) => t.cycle || t.freq;
  // Renvoie { id: numéro de la période en cours, next: instant (ms) du prochain reset } ou null si non configuré
  function periodInfo(cycle, now = Date.now()) {
    const c = DATA_TACHES.reset || {}, shift = (c.decalageUTC ?? 1) * HOUR - (c.heure ?? 4) * HOUR;
    const t = now + shift, d = Math.floor(t / DAY); // « jour de jeu » : change à l'heure de reset
    let id, nextShifted;
    if (cycle === "quotidienne") { id = d; nextShifted = (d + 1) * DAY; }
    else if (cycle === "hebdo") { const back = (((d + 4) % 7) - (c.hebdoJour ?? 1) + 7) % 7; id = d - back; nextShifted = (id + 7) * DAY; }
    else if (cycle === "mensuelle") { const x = new Date(t); id = x.getUTCFullYear() * 12 + x.getUTCMonth(); nextShifted = Date.UTC(x.getUTCFullYear(), x.getUTCMonth() + 1, 1); }
    else { const a = c[cycle]; if (!a || !a.ancre || !a.jours) return null; const adv = (a.avanceHeures || 0) * HOUR, ad = Math.floor(Date.parse(a.ancre + "T00:00:00Z") / DAY), dd = Math.floor((t + adv) / DAY); id = Math.floor((dd - ad) / a.jours); nextShifted = (ad + (id + 1) * a.jours) * DAY - adv; } // avanceHeures : reset avancé
    return { id, next: nextShifted - shift };
  }
  // Décoche les tâches d'un cycle dès que sa période a changé (rien n'est créé automatiquement)
  function applyResets() {
    let changed = false;
    CYCLES.forEach((cy) => {
      const p = periodInfo(cy); if (!p) return;
      if (state.periods[cy] === undefined) { state.periods[cy] = p.id; changed = true; return; } // 1er lancement : on mémorise sans rien effacer
      if (state.periods[cy] !== p.id) { DATA_TACHES.recurrentes.filter((t) => cycleOf(t) === cy).forEach((t) => delete state.checks[t.id]); state.periods[cy] = p.id; changed = true; }
    });
    if (changed) save();
    return changed;
  }
  const fmt = (ms) => { const m = Math.max(0, Math.ceil(ms / 6e4)), j = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mi = m % 60; return j ? `${j} j ${h} h` : h ? `${h} h ${String(mi).padStart(2, "0")}` : `${mi} min`; };
  const cdText = (cy) => { const p = periodInfo(cy); return p ? "· reset dans " + fmt(p.next - Date.now()) : ""; };
  function tick() {
    if (applyResets() && cur.tab === "taches" && cur.sub === "main") render_progressOnly();
    document.querySelectorAll("[data-cd]").forEach((el) => { el.textContent = cdText(el.dataset.cd); });
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
  function openDialog(titre, html) {
    if (!gdlg) {
      gdlg = document.createElement("dialog");
      gdlg.className = "guide";
      gdlg.setAttribute("aria-labelledby", "guide-title");
      document.body.appendChild(gdlg);
      // Fermeture : bouton ✕ ou clic sur le fond
      gdlg.addEventListener("click", (e) => {
        if (e.target === gdlg || e.target.closest("[data-close-guide]")) return gdlg.close();
        const st = e.target.closest("[data-star]"); if (!st) return;
        state.star = state.star === st.dataset.star ? "" : st.dataset.star; // un seul objectif à la fois ; 2e clic = retirer
        save(); const on = state.star === st.dataset.star; st.classList.toggle("on", on); st.setAttribute("aria-pressed", String(on)); refreshStar();
      });
    }
    gdlg.innerHTML = `<div class="guide-head"><h2 id="guide-title">${esc(titre)}</h2><button class="btn" data-close-guide aria-label="Fermer">✕</button></div><div class="guide-body">${html}</div>`;
    gdlg.showModal();
  }
  function openGuide(id) {
    const t = DATA_TACHES.recurrentes.find((x) => x.id === id);
    if (t && t.guide) openDialog(t.label, guideHtml(t.guide));
  }

  function vRessources(sub) {
    if (typeof RESSOURCES_DATA === "undefined") return '<p class="muted">Les données des ressources sont introuvables. Vérifiez que data-ressources.js est bien présent et à jour.</p>';
    const R = RESSOURCES_DATA;
    if (sub === "yt") {
      return `<p class="muted">${esc(R.youtubeNote)}</p>
      <div class="grid">${R.chainesYoutube.map((c) => card(
        `<div class="chan">
          ${c.avatar ? `<img class="avatar" src="${esc(c.avatar)}" alt="" loading="lazy">` : ""}
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
    if (im.hasAttribute("data-ph")) { const d = document.createElement("div"); d.className = "img-ph"; d.textContent = "Image à ajouter : " + im.dataset.name; im.replaceWith(d); return; }
    if (im.classList.contains("avatar") || im.hasAttribute("data-hide")) { im.style.display = "none"; return; }
    if (im.tagName === "IMG" && im.dataset.ext === "jpg") { im.dataset.ext = "webp"; im.src = IMG_DIR + im.dataset.name + ".webp"; }
    else if (im.tagName === "IMG" && im.dataset.ext === "webp") {
      const d = document.createElement("div"); d.className = "img-ph";
      d.textContent = "Image à ajouter : " + IMG_DIR + im.dataset.name + ".jpg (ou .webp)"; im.replaceWith(d);
    }
  }, true);

  function render() {
    const tab = TABS.find((t) => t.id === cur.tab);
    const pills = tab.subs.length ? `<div class="pills" role="tablist">${tab.subs.map(([id, n]) => `<button class="pill" role="tab" data-sub="${id}" aria-selected="${cur.sub === id}">${esc(n)}</button>`).join("")}</div>` : "";
    const body = { accueil: vAccueil, builds: vBuilds, taches: vTaches, tutos: vTutos, ressources: vRessources }[cur.tab](cur.sub);
    $("#view").innerHTML = `<div class="fade">${cur.tab === "accueil" ? "" : `<h1>${esc(tab.nom)}</h1>`}${pills}${body}</div>`;
    if (cur.tab === "builds" && cur.sub === "main") initPersos();
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
    const t = e.target.closest("[data-tab],[data-sub],[data-copy],[data-reset],[data-guide],[data-p]");
    if (!t) return;
    if (t.dataset.tab) go(t.dataset.tab);
    else if (t.dataset.sub) go(cur.tab, t.dataset.sub);
    else if (t.dataset.copy) copy(t.dataset.copy, t);
    else if (t.dataset.guide) openGuide(t.dataset.guide);
    else if (t.dataset.p) openPerso(t.dataset.p);
    else if (t.dataset.reset) { DATA_TACHES.recurrentes.filter((i) => i.freq === t.dataset.reset).forEach((i) => delete state.checks[i.id]); save(); render(); }
  });
  document.addEventListener("change", (e) => {
    const id = e.target.dataset && e.target.dataset.id; if (!id) return;
    if (e.target.checked) state.checks[id] = true; else delete state.checks[id];
    save(); const lab = e.target.closest(".check"); lab.classList.toggle("done", e.target.checked);
    const post = e.target.closest(".post");
    if (post) { const b = post.querySelector(".post-count"); if (b) b.textContent = post.querySelectorAll("input[data-id]:checked").length + "/" + post.querySelectorAll("input[data-id]").length; }
    else render_progressOnly();
  });
  function render_progressOnly() { const y = window.scrollY; render(); window.scrollTo(0, y); }

  function copy(text, btn) {
    const ok = () => { const o = btn.textContent; btn.textContent = "Copié ✓"; btn.classList.add("copied"); setTimeout(() => { btn.textContent = o; btn.classList.remove("copied"); }, 1400); };
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(text).then(ok, () => fallback());
    else fallback();
    function fallback() { const ta = document.createElement("textarea"); ta.value = text; document.body.appendChild(ta); ta.select(); try { document.execCommand("copy"); ok(); } catch (e) {} ta