/* Données : tâches. « freq » vaut quotidienne, hebdo ou mensuelle. Les id doivent rester uniques et stables. */
const DATA_TACHES = {
  recurrentes: [
    { id: "q-1", freq: "quotidienne", label: "Utiliser l'énergie quotidienne" },
    { id: "q-2", freq: "quotidienne", label: "Terminer les missions quotidiennes" },
    { id: "h-1", freq: "hebdo", label: "Battre le boss hebdomadaire" },
    { id: "m-1", freq: "mensuelle", label: "Récupérer la récompense du pass mensuel" }
  ],
  majActuelle: {
    version: "X.Y",
    items: [
      { id: "maj-xy-1", label: "Terminer l'histoire du nouvel acte", tip: "Passez les dialogues pour gagner du temps.", video: "https://www.youtube.com/" },
      { id: "maj-xy-2", label: "Compléter l'événement principal", tip: "Exemple de raccourci à remplacer.", video: "" }
    ]
  },
  majPrecedentes: [
    { version: "X.(Y-1)", items: [{ id: "maj-xy0-1", label: "Ancienne tâche de patch", tip: "", video: "" }] }
  ]
};
