/* Données : Personnages (filtres, bulles, cartes), astuces de base et Tutos. */
const DATA_BUILDS = {
  // Filtres : « id » doit correspondre exactement à la voie / au type indiqué dans chaque personnage.
  voies: [
    { id: "Destruction", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/715197244815c84eaf80b1644af7d9bc_5620687503360171464.png" },
    { id: "Chasse", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/c7aa25b129ea061e89c1c5f8b65c6686_7961003512756860180.png" },
    { id: "Érudition", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/a8458ce1c20e430c14ef937a260c0863_3461382062600394571.png" },
    { id: "Harmonie", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/e84ddead5d9a26c3827428cb4358f05e_5825200323544808775.png" },
    { id: "Nihilité", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/022ca2fa7843ec5dcbc882e6b99d3849_5658173062357230596.png" },
    { id: "Préservation", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/b60f0820cb22a4d9817befd2f53bb30a_4519413180795083617.png" },
    { id: "Abondance", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/b9d6d0e7ab963fd6c6ee778e826be66e_2240319466702070435.png" },
    { id: "Souvenir", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2025/12/30/9c48510ea6fbe27666819640fb7f4f2a_2179896539424553918.png" },
    { id: "Allégresse", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2025/12/30/738e91b749f2dc87675f9dc30c1cd85b_4288430239976265612.png" }
  ],
  types: [
    { id: "Quantique", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/2d33de43649b480e1d6a9fdb6599b2cb_7381386544905042228.png" },
    { id: "Physique", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/43a362875c2955a66ef6cd9236dbf57d_7293610557288342137.png" },
    { id: "Vent", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/8d2992ae95dfe1469af254b923b1129c_5790926101190505253.png" },
    { id: "Feu", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/ade90b393f1dfffe731766ed98c78746_8365675559481569213.png" },
    { id: "Imaginaire", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/9ab11de799de29f5c6abbac0a2b305e1_7514369334565575603.png" },
    { id: "Foudre", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/c3bf245ff0e28fab91b126fa8a24917b_5287731351692004917.png" },
    { id: "Glace", icone: "https://act-webstatic.hoyoverse.com/event-static-hoyowiki-admin/2024/03/27/e7fda5adc3b8ee20cef753b61ff0ed08_8813940564670780996.png" }
  ],

  // Un personnage = une bulle (icone) + une carte (sets, notes, jusqu'à 3 vidéos).
  // « nom » sert à la recherche et à l'infobulle, il n'est pas affiché dans la carte.
  persos: [
    { id: "perso-1", nom: "Personnage Exemple", icone: "", voie: "Destruction", type: "Feu",
      sets: ["", ""],                       // 2 URLs d'icônes de sets de reliques (fond transparent)
      notes: "Écrivez ici vos informations de construction.",
      videos: ["https://www.youtube.com/", "", ""] },
    { id: "perso-2", nom: "Soutien Exemple", icone: "", voie: "Harmonie", type: "Glace",
      sets: ["", ""], notes: "Exemple à remplacer.", videos: ["", "", ""] }
  ],

  astuces: [
    { id: "astuce-1", titre: "Commencer par le niveau du personnage", texte: "Montez d'abord le niveau et les compétences clés avant l'équipement." },
    { id: "astuce-2", titre: "Prioriser les statistiques", texte: "Regardez la stat principale de chaque pièce avant les sous-stats." }
  ],

  // Onglet « Tutos » : titre, résumé, étapes (facultatif) et lien vidéo (facultatif).
  tutos: [
    { id: "tuto-1", titre: "Tuto exemple", resume: "Décrivez ici le sujet du tutoriel.", etapes: ["Première étape", "Deuxième étape"], video: "" }
  ]
};
