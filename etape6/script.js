"use strict";   // Mode strict (slide 51)

/* ================================================================
   script.js - ÉTAPE 6 : suppression des lignes sélectionnées
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

// Appelée au clic sur "Ajouter" : lit le formulaire, contrôle la saisie puis insère les données
function doNewData() {
    // Récupérer les éléments du formulaire par leur id (getElementById : slide 61)
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");

    // Accéder à l'attribut value de chaque champ (propriété d'un élément : slide 93)
    const nom = elt_nom.value.trim();
    const prenom = elt_prenom.value.trim();

    // parseInt convertit le texte en entier (la valeur lue est toujours du texte : slide 37)
    const points = parseInt(elt_points.value);

    // Saisie contrôlée : aucun champ ne doit être vide (condition if..else : slide 42)
    // Opérateurs logiques || et === (slide 41)
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        // alert : méthode de window du BOM (slide 116)
        alert("Formulaire incomplet !");
    } else {
        // Appeler doInsert avec les nouvelles données (slide 45)
        doInsert(nom, prenom, points);

        // Insérer aussi les nouvelles données dans le tableau "persons" (slides 38 à 40)
        persons.push({ nom: nom, prenom: prenom, points: points });

        // Vider les champs pour préparer une autre saisie (propriété value : slide 93)
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}

// Supprime les lignes dont la case est cochée (tableau, résumé et tableau "persons")
function deleteRow() {

    // Étape 1 : vérifier si le tableau est vide (condition if : slide 42)
    if (lignes === 0) {
        alert("Le tableau est vide !");                 // alert (BOM : slide 116)
        return;                                         // sortir de la fonction
    }

    // Étape 2 : récupérer le corps du tableau et la liste des checkbox cochées
    // querySelector (slides 76-77) et querySelectorAll (slides 76-77)
    const table = document.querySelector("#table tbody");
    const cochees = document.querySelectorAll(".col_chkbox input:checked");

    // Étape 3 : vérifier si aucune checkbox n'est cochée
    if (cochees.length === 0) {
        alert("Sélectionnez au moins une ligne !");     // alert (BOM : slide 116)
        return;
    }

    // Étape 4 : demander une confirmation avant suppression
    // confirm est une boîte de dialogue de window, de la même famille que alert/prompt (slide 116)
    if (!confirm("Voulez-vous vraiment supprimer " + cochees.length + " ligne(s) ?")) {
        return;                                         // l'utilisateur a cliqué sur "Annuler"
    }

    // Étape 5 : récupérer toutes les lignes du tableau (querySelectorAll : slides 76-77)
    const rows = table.querySelectorAll("tr");

    // Étape 6 : parcourir les lignes (boucle for : slide 44).
    // On parcourt de la fin vers le début pour que les indices de "persons" restent valides
    // après chaque suppression (la ligne i du DOM correspond à persons[i]).
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");   // slides 76-77

        // Pour chaque ligne, vérifier si la checkbox est cochée (propriété checked : slide 93)
        if (checkbox.checked) {
            // Récupérer la valeur des points dans la 4e cellule (propriété children : slide 89)
            const points = parseInt(row.children[3].innerText);

            total_points -= points;     // la soustraire de total_points (opérateur -= : slide 41)
            lignes--;                   // décrémenter la variable lignes (opérateur -- : slide 41)
            row.remove();               // supprimer la ligne du DOM (remove : slide 100)
            persons.splice(i, 1);       // supprimer la même entrée dans le tableau persons (slide 38)
        }
    }

    // Renuméroter la colonne N° pour garder une numérotation continue (1, 2, 3...)
    // et pour que le prochain numéro (lignes + 1) ne crée pas de doublon.
    const restantes = table.querySelectorAll("tr");
    for (let i = 0; i < restantes.length; i++) {
        restantes[i].children[0].innerText = i + 1;     // children (slide 89), innerText (slide 91)
    }

    // Étape 7 : afficher un message de succès et mettre à jour le résumé
    alert("Suppression effectuée avec succès !");
    update_summary();
}

/* Question du TP : "Que remarquez-vous après l'actualisation de la page ?"
   -> Les lignes supprimées réapparaissent : la suppression n'a eu lieu que dans le DOM et dans
      le tableau "persons" en mémoire. À l'actualisation, index.html et script.js sont rechargés,
      "persons" est recréé avec ses 3 objets de départ et le tableau est reconstruit par init().
      Rien n'est sauvegardé (il faudrait un stockage côté navigateur ou un serveur). */

/* ================================================================
   BONUS (demandé dans la consigne : "modification") - non décrit dans le PDF.
   Double-clic sur une cellule Nom / Prénom / Points pour la modifier.
   Supprimez ce bloc si vous ne voulez pas cette fonctionnalité.
   ================================================================ */

// Écouteur d'événement "dblclick" sur le corps du tableau (addEventListener, dblclick : slide 139)
// La fonction fléchée est un callback (slides 46 et 47)
document.querySelector("#table tbody").addEventListener("dblclick", (event) => {
    modifyCell(event.target);
});

function modifyCell(cell) {
    // On ne modifie que les colonnes Nom (1), Prénom (2) et Points (3)
    if (cell.tagName !== "TD") return;
    const row = cell.parentNode;                                // parentNode (slide 89)
    const colIndex = Array.from(row.children).indexOf(cell);    // children (slide 89)
    if (colIndex < 1 || colIndex > 3) return;

    // Position de la ligne = position dans le tableau persons
    const rowIndex = Array.from(row.parentNode.children).indexOf(row);
    const champs = ["", "nom", "prenom", "points"];             // tableau (slide 38)
    const champ = champs[colIndex];

    // prompt : boîte avec champ de saisie (BOM : slide 116)
    const saisie = prompt("Nouvelle valeur pour " + champ + " :", cell.innerText);
    if (saisie === null) return;                                // "Annuler"

    let valeur = saisie.trim();
    if (valeur === "") {
        alert("Valeur vide !");
        return;
    }

    if (champ === "points") {
        valeur = parseInt(valeur);
        if (Number.isNaN(valeur)) {
            alert("Les points doivent être un nombre !");
            return;
        }
        // Ajuster le total : on retire l'ancienne valeur, on ajoute la nouvelle (slide 41)
        total_points += valeur - persons[rowIndex].points;
    }

    cell.innerText = valeur;            // mise à jour du DOM (slide 91)
    persons[rowIndex][champ] = valeur;  // mise à jour du tableau persons (slide 39)
    update_summary();                   // mise à jour du résumé
}
