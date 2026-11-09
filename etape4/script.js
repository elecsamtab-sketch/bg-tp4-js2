"use strict";   // Mode strict (slide 51)

/* ================================================================
   script.js - ÉTAPE 4 : espace "Résumé"
   ================================================================ */

// Compteur du nombre de lignes insérées, initialisé à 0 (variable avec let : slides 37 et 51)
let lignes = 0;

// Total des points, initialisé à 0 (slides 37 et 51)
let total_points = 0;

// Tableau d'objets "persons" : chaque objet possède nom, prenom et points (slides 38, 39 et 40)
const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

// Appel de init() au chargement du script (le script est à la fin du body : slide 27)
init();

// init() parcourt le tableau persons et appelle doInsert pour chaque objet
function init() {                                       // fonction : slide 45
    // Boucle for..of pour parcourir les objets du tableau (slide 44)
    for (const person of persons) {
        // Accès aux propriétés d'un objet avec la notation point (slide 39)
        doInsert(person.nom, person.prenom, person.points);
    }
}

// doInsert met à jour les variables, insère la ligne puis met à jour le résumé
function doInsert(nom, prenom, points) {
    // Incrémenter la variable lignes de 1 (opérateur ++ : slide 41), puis l'utiliser comme num
    lignes++;
    const num = lignes;

    // Rajouter points à total_points (opérateur combiné += : slide 41)
    total_points += points;

    // Appel de la fonction définie à l'étape 2 (slide 45)
    doInsertRowTable(num, nom, prenom, points);

    // Mettre à jour l'espace résumé
    update_summary();
}

// Fonction qui insère une ligne dans le tableau (déclaration de fonction : slide 45)
function doInsertRowTable(num, nom, prenom, points) {

    // Récupérer l'élément tableau (corps du tableau) avec un sélecteur CSS (slides 76-77)
    const table = document.querySelector("#table tbody");

    // Créer un élément de type tr (ligne de tableau) : createElement (slide 104)
    const row = document.createElement("tr");

    // Affecter la valeur "row" à l'attribut "class" avec setAttribute (slide 107)
    row.setAttribute("class", "row");

    // Créer 5 éléments de type td (colonnes du tableau) (slide 104)
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");

    // Remplir le contenu de chaque colonne avec innerText (slide 91)
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;

    // La dernière colonne contient un élément input dont l'attribut type vaut checkbox
    const checkbox = document.createElement("input");   // createElement (slide 104)
    checkbox.setAttribute("type", "checkbox");          // setAttribute (slide 107)
    col5.append(checkbox);                              // append (slide 98)

    // Affecter les classes correspondantes à chaque colonne (setAttribute : slide 107)
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");

    // Rajouter les colonnes à la ligne row avec la méthode append() (slide 98)
    row.append(col1, col2, col3, col4, col5);

    // Rajouter la ligne row au tableau table (slide 98)
    table.append(row);
}

// Affiche le contenu du tableau "persons" dans la console du navigateur
function consoleTableau() {
    console.log(persons);
}

// Met à jour l'espace "Résumé" (nombre de lignes et total des points)
function update_summary() {
    // Récupérer l'élément id = p1 (getElementById : slide 61)
    const element_lignes = document.getElementById("p1");

    // Récupérer l'élément id = p3 (getElementById : slide 61)
    const element_points = document.getElementById("p3");

    // Avec innerText, modifier le contenu des éléments (slide 91)
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
}
