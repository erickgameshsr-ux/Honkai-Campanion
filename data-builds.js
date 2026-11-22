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

  // Un personnage = une bulle (icone) + une fiche (sets, notes, jusqu'à 3 vidéos).
  // « nom » sert à la recherche et à l'infobulle. « icone » : URL de l'image de la bulle (sinon une lettre s'affiche).
  // « voie » et « type » doivent s'écrire comme dans les listes ci-dessus (ils servent aux filtres).
  // « role » est conservé pour plus tard (non affiché dans la fiche).
  persos: [
    { id: "perso-nocterna", nom: "Nocterna", icone: "https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/08/04/37134325/1306615dd73b16ab22968142bc6a2e03_711217016507104817.png?x-oss-process=image%2Fformat%2Cwebp", voie: "Souvenir", type: "Glace", role: "Support / Sub-DPS",
      sets: [
        "https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2026/02/12/77791097/9a348f0181eed9aeb817c7a9b6311bde_1152942398567428191.png?x-oss-process=image%2Fformat%2Cwebp",
        "https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2025/02/26/11859656/7251b84e4bf2b72203cbc992df5e1f8b_2336671630880359209.png?x-oss-process=image%2Fformat%2Cwebp"
      ],
      notes: "💯 Statistiques Globales :\n\n• PV: +9 000 = 11,5% /Relique\n• TC: 60% = 6% /Relique\n• DC: +180% = 10,5% /Relique\n\n⚔️ Reliques :\n\n• Corps : DC\n• Pieds : PV%\n• Orbe : PV%\n• Corde : PV%\n\n🔻 Priorités des sous-statistiques :\n• TC › DC › PV% › PV",
      videos: ["https://youtu.be/-ZH__DkYyqs", "", ""] },
    { id: "perso-dhil", nom: "Dan Heng Imbibitor Lunae", icone: "https://upload-static.hoyoverse.com/hoyolab-wiki/2023/07/05/8454003/107dc42aa40d8eae8586c1910e85e217_2761183077280600224.png?x-oss-process=image%2Fformat%2Cwebp", voie: "Destruction", type: "Imaginaire", role: "DPS",
      sets: [
        "https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2026/10/19/77791097/fe5592f7a27ad70693d9786fa2f399af_2723699484675902102.png?x-oss-process=image%2Fformat%2Cwebp",
        "https://act-upload.hoyoverse.com/event-ugc-hoyowiki/2026/02/12/77791097/64fdf0f8bd1e5597995c366ea1915b91_2548329267886427373.png?x-oss-process=image%2Fformat%2Cwebp"
      ],
      notes: "💯 Statistiques Globales :\n\n• ATQ: +3 000 = 4% /Relique\n• TC: +90% = 4,5% /Relique\n• DC: +170% = 14,5% /Relique\n\n⚔️ Reliques :\n\n• Corps : TC\n• Pieds : ATQ%\n• Orbe : DGT Imaginaires\n• Corde : ATQ%\n\n🔻 Priorités des sous-statistiques :\n• TC › DC › ATQ%",
      videos: ["https://youtu.be/S8tgMM2mXdc?t=510", "", ""] }
  ],

  // Astuces : soit « texte » simple, soit « blocs » (["p","texte"], ["h","Titre"], ["ul",[...]], ["img","assets/x.jpg","légende"], ["video","url","titre"]).
  astuces: [
    { id: "astuce-filtres-reliques", titre: "Comment se servir de l'outil de Configuration de Filtres", blocs: [
      ["p", "Pour trier les reliques intéressantes pour son personnage il existe un outil qui permet de faire table rase sur les reliques inintéressantes."],
      ["p", "Comme montré ci-dessous dans les illustrations, il suffit d'aller sur son personnage, de cliquer sur une des reliques et un bouton ouvre directement sur l'outil de Configuration de Filtres."],
      ["img", "assets/HT1.jpg"], ["img", "assets/HT2.jpg"], ["img", "assets/HT3.jpg"],
      ["p", "Ici vous pourrez choisir l'ensemble de reliques, les statistiques principales et secondaires. Si vous avez un doute sur les statistiques du personnage, n'hésitez pas à le vérifier sur sa fiche personnage dans l'onglet Guide/Personnages. Vous pouvez aussi aller consulter les sites ou chaînes youtube dans Ressources conseillés."],
      ["img", "assets/HT4.jpg"], ["img", "assets/HT5.jpg"],
      ["p", "Une fois configuré, n'oubliez pas d'enregistrer le filtre pour le réutiliser plus tard."],
      ["img", "assets/HT6.jpg"]
    ] },
    { id: "astuce-1", titre: "Commencer par le niveau du personnage", texte: "Montez d'abord le niveau et les compétences clés avant l'équipement." },
    { id: "astuce-2", titre: "Prioriser les statistiques", texte: "Regardez la stat principale de chaque pièce avant les sous-stats." }
  ],

  // Onglet « Tutos » : titre, résumé, étapes (facultatif) et lien vidéo (facultatif).
  tutos: [
    { id: "tuto-1", titre: "Tuto exemple", resume: "Décrivez ici le sujet du tutoriel.", etapes: ["Première étape", "Deuxième étape"], video: "" }
  ]
};
