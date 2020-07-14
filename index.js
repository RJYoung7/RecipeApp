function ancestorHTML() {
    const ancestor = document.createElement('div');
    ancestor.classList.add("tile", "is-ancestor");
    return ancestor;
}

function tileHTML(recipe) {
    const parent = document.createElement('div');
    parent.classList.add("tile", "is-parent", );
    parent.innerHTML = `<div class="tile is-parent is-vertical box">
                        <div class="tile is-child">
                            <p class="title">${recipe.title}</p>
                        </div>
                        <div class="imgDiv">
                            <img src="${recipe.img}">
                        </div>
                        </div>
                        `;
    return parent;
}

function displayRecipeTiles(recipes, container) {
    for (let i = 0; i < recipes.length; i += 4) {
        let ancestor = ancestorHTML();
        for (let j = i; j < i + 4 && j < recipes.length; j++) {
            ancestor.appendChild(tileHTML(recipes[j]));
        }
        container.appendChild(ancestor);
    }
}

const recipesContainer = document.getElementById('recipeTiles');
displayRecipeTiles(defaultRecipes, recipesContainer);