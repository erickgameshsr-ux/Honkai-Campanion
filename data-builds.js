/* Données : builds optimisés et astuces de base. Image : mettre une URL dans « image » (ou laisser vide). */
const DATA_BUILDS = {
  builds: [
    {
      id: "perso-exemple", nom: "Personnage Exemple", image: "", role: "DPS principal",
      rarete: "5★", element: "Feu", tier: "S",
      stats: { "Stat principale": "Taux de coup critique", "Cible dégâts critiques": "180 %", "Vitesse": "134+" },
      sets: "Set offensif 4 pièces + set de soutien 2 pièces",
      notes: "Exemple de conseil : prioriser les dégâts critiques avant la vitesse.",
      videos: [{ titre: "Guide vidéo", url: "https://www.youtube.com/" }]
    },
    {
      id: "perso-soutien", nom: "Soutien Exemple", image: "", role: "Soutien",
      rarete: "4★", element: "Glace", tier: "A",
      stats: { "Vitesse": "160+", "Précision d'effet": "70 %" },
      sets: "Set de vitesse 4 pièces", notes: "Exemple à remplacer.", videos: []
    }
  ],
  astuces: [
    { id: "astuce-1", titre: "Commencer par le niveau du personnage", texte: "Montez d'abord le niveau et les compétences clés avant l'équipement." },
    { id: "astuce-2", titre: "Prioriser les statistiques", texte: "Regardez la stat principale de chaque pièce avant les sous-stats." }
  ]
};
