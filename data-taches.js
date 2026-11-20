/* Données : tâches. « freq » vaut quotidienne, hebdo ou mensuelle. Les id doivent rester uniques et stables.
   Guide : liste de blocs → ["h","Titre"], ["p","Texte"], ["ul",["a","b"]], ["img","ITA1","Légende facultative"].
   Les images ITAx sont cherchées dans assets/taches/ITAx.jpg (puis ITAx.webp). */
const DATA_TACHES = {
  recurrentes: [
    /* ---- Quotidiennes ---- */
    { id: "q-affectations", freq: "quotidienne", label: "Affectations",
      guide: [["img", "ITA1", "Affectations (1/2)"], ["img", "ITA2", "Affectations (2/2)"]] },
    { id: "q-entrainement", freq: "quotidienne", label: "Entraînement Quotidien",
      guide: [
        ["img", "ITA3"], ["img", "ITA4"], ["img", "ITA5"],
        ["h", "Caverne de reliques"],
        ["p", "Choisissez celle qui contient le ou les sets de reliques dont ont le plus besoin les personnages que vous construisez."],
        ["h", "Si aucun réel besoin (rare)"],
        ["p", "Faites celle de la « Voie du Vent glacial » (la toute dernière), qui permet de récupérer le set « Aigle de la frontière du crépuscule ». Il est très utile sur beaucoup de personnages, et cela permet de valider les quotidiennes tout en récupérant des « Vestiges de reliques »."]
      ] },

    /* ---- Hebdomadaires / Bi-hebdomadaires ---- */
    { id: "h-echos", freq: "hebdo", label: "3× Échos de Guerre",
      guide: [
        ["img", "ITA6", "Faites en priorité celui où vous possédez le moins de matériaux d'élévation (en général les plus récents). Vous pouvez le vérifier en cliquant dessus pour chaque échos, avant de finir le reste de votre puissance de pionnier pour les reliques."]
      ] },
    { id: "h-univers", freq: "hebdo", label: "1× Univers Parallèle / Guerre des Monnaies",
      guide: [
        ["p", "L'Univers Parallèle est bien plus rapide. Cependant, si la Guerre des Monnaies n'est pas encore terminée, il est préférable de la prioriser."],
        ["img", "ITA7", "Au choix. Il n'est pas interdit de faire les deux pour augmenter le niveau d'ascension de chaque mode."],
        ["img", "ITA8", "Pour une complétion hebdomadaire, privilégiez un mode plus rapide et facile, plus permissif en cas de négligence."],
        ["img", "ITA9", "C'est le niveau de bascule : plus haut, les points hebdomadaires n'augmentent pas avant d'atteindre un niveau de difficulté trop élevé ; trop bas, ils baissent trop vite pour évoluer efficacement."],
        ["img", "ITA10", "Pareil ici : privilégiez toujours un mode rapide et facile pour une complétion hebdomadaire."],
        ["img", "ITA11", "Ne pas activer le « Protocole de seuil », pour garder l'avantage de ce mode : les points de techniques rechargeables. Privilégiez au départ l'équipe de base (exemple : Castorice / Nocterna / Cyrene / Hyacine), puis remplacez temporairement le personnage le moins important (exemple : Nocterna) par un personnage capable de « skip » un combat contre de petits ennemis, comme Acheron, Phainon ou Louve d'Argent niv.999. Privilégiez donc les cheminements de combat standard pour maximiser cet avantage rapide."]
      ] },
    { id: "h-moc", freq: "hebdo", label: "MOC / PF / AS", badge: "Bi-hebdomadaire", cycle: "bihebdo",
      guide: [
        ["img", "ITA12"],
        ["p", "Si vous vous connectez régulièrement, vous ne devriez regarder que cet onglet : le dernier mode de fin de jeu (End Game) sort toutes les deux semaines. Pour une complétion sans prise de tête, activez le mode auto sur le dernier étage accessible :"],
        ["ul", ["Salle Oublié (MOC) : Salle 10 (10/12)", "Pure Fiction (PF) : Salle 3 (3/4)", "Fantômes de l'Apocalypse (AS) : Salle 3 (3/4)"]],
        ["p", "Vous obtenez ainsi 80 % des récompenses sans effort. Pour le reste, tentez le mode auto si vos équipes le permettent, sinon il faudra optimiser les rotations pour gagner les quelques jades restants."],
        ["p", "Le dernier palier de chaque mode demande 3 équipes (Mode Stellaire) : à ce stade, privilégiez plutôt le mode standard à 2 équipes."]
      ] },

    /* ---- Mensuelles / MÀJ ---- */
    { id: "m-resines", freq: "mensuelle", label: "Synthétiser 2 Résines",
      guide: [
        ["p", "À faire à chaque début de mois, à l'aide de « Vestiges de reliques » (ils se récupèrent en recyclant des reliques inutilisables)."],
        ["img", "ITA13"], ["img", "ITA14"]
      ] },
    { id: "m-tickets", freq: "mensuelle", label: "Récupérer 10 Tickets",
      guide: [
        ["p", "Récupérez les 10 tickets dans la boutique. Le troisième matériau n'est pas obligatoire, mais reste rare."],
        ["img", "ITA15"], ["img", "ITA16"]
      ] },
    { id: "m-maj", freq: "mensuelle", label: "Récupérer les 2 Résines & 2 Poussières solistellaire", badge: "MÀJ", cycle: "maj",
      guide: [
        ["p", "Ces matériaux sont bloqués dans le mode le plus difficile du jeu : l'Arbitre de l'Instable. Le troisième n'est pas obligatoire s'il vous manque des ressources, mais reste un bonus."],
        ["img", "ITA17"]
      ] }
  ],

  // Réinitialisation automatique des cases (calculée sur l'heure du serveur de jeu).
  reset: {
    decalageUTC: 1,   // Europe = 1, Amérique = -5, Asie / TW-HK-MO = 8
    heure: 4,         // réinitialisation à 04:00, heure du serveur
    hebdoJour: 1,     // 1 = lundi
    bihebdo: { ancre: "2026-11-16", jours: 14 },  // À AJUSTER : un jour de début de rotation (AAAA-MM-JJ)
    maj: { ancre: "2026-11-10", jours: 43, avanceHeures: 48 }  // À AJUSTER : jour de début de la version. avanceHeures : le reset et le compte à rebours arrivent 48 h plus tôt (mettre 0 pour la fin de période exacte)
  },

  // Onglet « MAJ » : un post par version, le plus récent en premier.
  // Blocs : ["h","Titre"] ["p","Texte"] ["ul",["a","b"]] ["check","id-unique","Libellé","Astuce facultative"]
  //         ["video","https://...","Titre"] ["img","assets/maj/xy-1.jpg","Légende facultative"]
  maj: [
    { version: "X.Y", date: "2026-11-10", blocs: [
      ["h", "À faire en priorité"],
      ["check", "maj-xy-histoire", "Terminer l'histoire du nouvel acte", "Passez les dialogues pour gagner du temps."],
      ["check", "maj-xy-event", "Compléter l'événement principal"],
      ["video", "https://www.youtube.com/", "Guide vidéo"],
      ["h", "Notes"],
      ["p", "Écrivez ici ce que vous voulez : texte, listes, images, liens."],
      ["img", "assets/maj/XY-1.jpg", "Légende de l'image"]
    ] }
  ]
};
