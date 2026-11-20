// Données de l'onglet C : Sites conseillés et Chaînes YouTube conseillées
// À mettre à jour ou enrichir librement au fil des patchs.

const RESSOURCES_DATA = {
  youtubeNote:
    "Pour les créateurs de contenus, n'hésitez pas à consulter l'onglet Playlist où ils proposent souvent des séries de guides dédiées à un sujet précis de Honkai: Star Rail.",

  sites: [
    {
      id: "hoyolab-profil",
      nom: "Profil HoYoLAB",
      description:
        "Aperçu rapide du profil en jeu, builds des personnages et scores dans les différents modes.",
      url: "https://act.hoyolab.com/app/community-game-records-sea/rpg/index.html?bbs_presentation_style=fullscreen&gid=6&v=101&bbs_theme=dark&bbs_theme_device=1#/hsr",
      categorie: "Suivi & Profil"
    },
    {
      id: "hoyowiki-hsr",
      nom: "HoYoWiki",
      description:
        "Toutes les informations relatives aux personnages, cônes de lumière et reliques sortis en jeu sont consultables ici.",
      url: "https://wiki.hoyolab.com/pc/hsr/aggregate/104",
      categorie: "Base de données"
    },
    {
      id: "hoyolab-pulls",
      nom: "Historique Pulls HoYoLAB",
      description:
        "Permet de suivre le nombre de tirages effectués sur 1 an.",
      url: "https://act.hoyolab.com/sr/event/gt-aio/gacha-records/index.html?utm_source=hoyolab&utm_medium=tool&lang=fr-fr&bbs_theme=dark&bbs_theme_device=",
      categorie: "Outils & Stats"
    },
    {
      id: "hoyobuild-tools",
      nom: "Outils Pratiques HoyoBuild",
      description:
        "Site non officiel disposant de plusieurs petits outils comme le calculateur de pity, le planificateur de ressources et bien d'autres.",
      url: "https://hoyobuild.com/fr/hsr/tools",
      categorie: "Outils & Calculateurs"
    }
  ],

  chainesYoutube: [
    {
      id: "alex-yuki",
      nom: "Alex Yuki",
      leaks: false,
      description:
        "Créateur de contenu francophone (plus de 110 000 abonnés sur YouTube) spécialisé dans les jeux gacha (Honkai: Star Rail, Genshin Impact, Arknights: Endfield). Guides de personnages détaillés (reliques, cônes de lumière, synergies d'équipes), conseils d'invocation selon la méta, tests comparatifs, récaps de mises à jour et rediffusions de défis endgame (Mémoire du chaos, Pure Fiction, Fantôme de l'apocalypse) issus de ses lives Twitch.",
      url: "https://www.youtube.com/@AlexYukiii/featured",
      avatar:
        "https://yt3.googleusercontent.com/VooozYzZ1DL5_TFXVe-jTrQh84qvQpPCS0qVntw8nVHxI6XmbjmNVMBBFluvRtS5zaXYCXdPUM8=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: "nia",
      nom: "Nia",
      leaks: true,
      description:
        "Streameuse Twitch et créatrice de contenu francophone principalement centrée sur Honkai: Star Rail (et d'autres gacha comme Arknights: Endfield ou NTE). Guides complets de personnages (builds, reliques, équipes, theorycrafting), analyses d'optimisation, formats courts et couverture ouverte des leaks / données de bêtas (kits futurs, bannières, mises à jour). Ses lives Twitch mêlent histoire/lore, sessions d'invocations, aide aux comptes et modes endgame.",
      url: "https://www.youtube.com/@nia_twitch/featured",
      avatar:
        "https://yt3.googleusercontent.com/yIUBzrVk6unpWZeRA5iv0OtvSrElAFYFuUxZ7eehtR6hlaFDHQBfO7UXyzLzxnca-K2-wYYJnQ=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: "azertii",
      nom: "Azertii",
      leaks: true,
      description:
        "YouTubeur francophone (avec une activité plus secondaire sur Twitch) très productif et massivement dédié à Honkai: Star Rail (ainsi que d'autres jeux comme Sword Art Online: Alicization Rising Steel). Axé actualité et méta : guides de personnages (reliques, cônes de lumière, investissements), analyses de leaks (bêta, buffs, drip marketing, futures bannières), tests comparatifs, invocations et essais endgame (Mémoire du chaos, Pure Fiction, Fantômes de l'apocalypse, Arbitre de l'instable).",
      url: "https://www.youtube.com/@azertii/videos",
      avatar:
        "https://yt3.googleusercontent.com/5DjEdOqNPVXPO1YFDZ-kYivVhkIbkQZKsO97xf5adaSar3jrN5N-IvTCH5zLZXk000xuUYQXtA=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: "nepyutsu",
      nom: "Nepyutsu",
      leaks: false,
      description:
        "Créateur de contenu francophone quasi exclusivement dédié à Genshin Impact et Honkai: Star Rail. Orienté complétion et archivage narratif : quêtes d'histoire complètes (Missions pionnières, quêtes de monde et de compagnon) et guides d'exploration exhaustifs à 100 % (coffres, oiseaux en origami, livres, énigmes et succès cachés).",
      url: "https://www.youtube.com/@Nepyutsu/playlists",
      avatar:
        "https://yt3.googleusercontent.com/K0away7YUGQAUG3LNY8M2OwjXdIrDabtbmC9tDL6YInIY8x1Zab_g9msznoe1aopdeWUKNYXfQ=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: "bladelarkin",
      nom: "Bladelarkin",
      leaks: false,
      description:
        "Créateur de contenu francophone sur YouTube principalement centré sur l'univers narratif de Honkai: Star Rail. Résumés d'histoire détaillés à chaque mise à jour pour suivre les Missions pionnières, ainsi que vidéos d'analyse sur les enjeux de l'univers, les factions (Aiôns, Chasseurs de Stellaron, etc.) et les mystères du scénario.",
      url: "https://www.youtube.com/@bladelarkin5486",
      avatar:
        "https://yt3.googleusercontent.com/KgP4JQa0oBtYbCxVeGtEwo_skceHPVmqLZ5bqk9KbtHqeY5KLiBSk39PhmyU4UMxXMwVAnAR=s160-c-k-c0x00ffffff-no-rj"
    },
    {
      id: "hsr-officiel",
      nom: "Honkai: Star Rail (Chaîne Officielle)",
      leaks: false,
      description:
        "Chaîne YouTube officielle d'HoYoverse (près de 2,8 millions d'abonnés) pour l'actualité et la promotion du jeu : Programmes spéciaux (lives de version, événements et codes cadeaux), bandes-annonces de versions et personnages, série À la découverte de Star Rail (Keeping Up With Star Rail), courts-métrages animés, vidéos de lore (Pérégrinations célestes / Myriad Celestia), EP musicaux et concerts en ligne.",
      url: "https://www.youtube.com/@HonkaiStarRail/featured",
      avatar:
        "https://yt3.googleusercontent.com/1aGBWaKfl_O5ScixHfwRh7cOUD6sY9U6JjMFo3yeKVmwPfDsM8m9XuQ1FKsH25pnFMw7gDpfnQ=s160-c-k-c0x00ffffff-no-rj"
    }
  ]
};
