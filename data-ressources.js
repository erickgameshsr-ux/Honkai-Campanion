// Données de l'onglet C : Sites conseillés et Chaînes YouTube conseillées
// À mettre à jour ou enrichir librement au fil des patchs.

const RESSOURCES_DATA = {
  youtubeNote:
    "Pour les créateurs de contenus, n'hésitez pas à consulter l'onglet Playlist où ils proposent souvent des séries de guides dédiées à un sujet précis de Honkai: Star Rail.",

  sites: [
    {
      id: "hoyolab-profil",
      nom: "Profil HoYoLAB",
      description: "Aperçu rapide du profil en jeu, builds des personnages et scores dans les différents modes.",
      url: "https://act.hoyolab.com/app/community-game-records-sea/rpg/index.html?bbs_presentation_style=fullscreen&gid=6&v=101&bbs_theme=dark&bbs_theme_device=1#/hsr",
      categorie: "Suivi & Profil"
    },
    {
      id: "hoyowiki-hsr",
      nom: "HoYoWiki",
      description: "Toutes les informations sur les personnages, cônes de lumière et reliques sortis en jeu.",
      url: "https://wiki.hoyolab.com/pc/hsr/aggregate/104",
      categorie: "Base de données"
    },
    {
      id: "hoyolab-pulls",
      nom: "Historique Pulls HoYoLAB",
      description: "Permet de suivre le nombre de tirages effectués sur 1 an.",
      url: "https://act.hoyolab.com/sr/event/gt-aio/gacha-records/index.html?utm_source=hoyolab&utm_medium=tool&lang=fr-fr&bbs_theme=dark&bbs_theme_device=",
      categorie: "Outils & Stats"
    },
    {
      id: "hoyobuild-tools",
      nom: "Outils Pratiques HoyoBuild",
      description: "Site non officiel avec plusieurs outils : calculateur de pity, planificateur de ressources et autres.",
      url: "https://hoyobuild.com/fr/hsr/tools",
      categorie: "Outils & Calculateurs"
    },
    {
      id: "telegram-codes",
      nom: "Codes Promotionnels",
      description: "Retrouvez tous les nouveaux codes pour obtenir des jades stellaires en suivant ce canal Telegram. N'hésitez pas à activer les notifications pour être prévenu à temps !",
      url: "https://t.me/genddc_HSR",
      categorie: "Codes"
    },
    {
      id: "telegram-leaks",
      nom: "Canal Telegram de Leaks",
      description: "C'est le centre névralgique du leaks, l'un des canaux Telegram les plus reconnus pour le partage de fuites de bêta sur Honkai Star Rail.",
      url: "https://t.me/StarRailLeaks",
      categorie: "Leaks"
    },
    {
      id: "prydwen",
      nom: "Prydwen",
      description: "Surtout connu pour sa tier list (classement) des personnages du jeu, il regorge également de guides sur les personnages et bien plus encore. Cependant pensez à activer le traducteur car il est en anglais.",
      url: "https://www.prydwen.gg/star-rail/characters",
      categorie: "Tier list & guides"
    }
  ],

  chainesYoutube: [
    {
      id: "alex-yuki",
      nom: "Alex Yuki",
      leaks: false,
      description: "Guides de personnages (reliques, cônes de lumière, équipes), conseils d'invocation et rediffusions de défis endgame.",
      url: "https://www.youtube.com/@AlexYukiii/featured",
      avatar: "assets/alexyuki.png"
    },
    {
      id: "nia",
      nom: "Nia",
      leaks: true,
      description: "Guides complets de personnages, analyses d'optimisation et couverture des leaks et données de bêta.",
      url: "https://www.youtube.com/@nia_twitch/featured",
      avatar: "assets/nia.png"
    },
    {
      id: "azertii",
      nom: "Azertii",
      leaks: true,
      description: "Actualité et méta : guides de personnages, analyses de leaks, invocations et essais endgame.",
      url: "https://www.youtube.com/@azertii/videos",
      avatar: "assets/azertii.png"
    },
    {
      id: "nepyutsu",
      nom: "Nepyutsu",
      leaks: false,
      description: "Quêtes d'histoire complètes et guides d'exploration à 100 % (coffres, énigmes, succès cachés).",
      url: "https://www.youtube.com/@Nepyutsu/playlists",
      avatar: "assets/nepyutsu.png"
    },
    {
      id: "bladelarkin",
      nom: "Bladelarkin",
      leaks: false,
      description: "Résumés d'histoire à chaque mise à jour et analyses du scénario et des factions.",
      url: "https://www.youtube.com/@bladelarkin5486",
      avatar: "assets/bladelarkin.png"
    },
    {
      id: "hsr-officiel",
      nom: "Honkai: Star Rail (Chaîne Officielle)",
      leaks: false,
      description: "Chaîne officielle : programmes spéciaux avec codes cadeaux, bandes-annonces, courts-métrages et musique.",
      url: "https://www.youtube.com/@HonkaiStarRail/featured",
      avatar: "assets/hsryoutube.png"
    }
  ]
};
