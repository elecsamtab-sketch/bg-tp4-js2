"use strict";   // Mode strict : signale les variables non déclarées (slide 51)

/* ================================================================
   script.js - ÉTAPE 2 : insertion d'une nouvelle ligne
   ================================================================ */

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

/* Question du TP : "Que remarquez-vous après l'actualisation de la page ?"
   -> Les lignes ajoutées ont disparu. Notre script modifie uniquement le DOM, c'est-à-dire
      la représentation en mémoire de la page dans le navigateur (slides 56-57).
      À l'actualisation, le navigateur recharge le fichier index.html d'origine et reconstruit
      un DOM neuf : les modifications faites en mémoire ne sont ni sauvegardées ni envoyées au serveur. */
