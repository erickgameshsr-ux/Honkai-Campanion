/* Données : accueil (actus, events, codes, log du site) et onglet D (bêta, futur). À modifier à chaque patch. */
const DATA_ACCUEIL = {
  actus: [
    { id: "actu-patch-x", titre: "Version X.Y : résumé du patch", date: "2026-11-15", texte: "Nouveau personnage, nouvelle zone et équilibrage. Exemple de données à remplacer.", lien: "https://example.com/patch" }
  ],
  events: [
    { id: "evt-1", titre: "Événement de connexion", debut: "2026-11-10", fin: "2026-11-30", infos: "Récompenses cumulables chaque jour." }
  ],
  codes: [
    { id: "code-1", code: "EXEMPLE2026", recompense: "Crédits + matériaux", expire: "2026-12-01" }
  ],
  // Le premier élément du log sert de « dernière version du site » pour le badge Nouveautés.
  log: [
    { id: "log-2", date: "2026-11-19", titre: "Ajout de l'export de sauvegarde", texte: "Vous pouvez désormais copier votre progression en texte." },
    { id: "log-1", date: "2026-11-01", titre: "Mise en ligne du site", texte: "Première version." }
  ]
};
const DATA_VEILLE = {
  beta: [
    { id: "beta-1", date: "2026-11-12", statut: "Confirmé", titre: "Bêta : ajustement des compétences", texte: "Exemple d'information issue de la bêta." },
    { id: "beta-2", date: "2026-11-14", statut: "Rumeur", titre: "Possible nouveau mode de jeu", texte: "À confirmer officiellement." }
  ],
  futur: [
    { id: "fut-1", date: "2027-Q1", statut: "Annoncé", titre: "Collaboration annoncée", texte: "Détails à venir. Exemple moyen/long terme." }
  ]
};
