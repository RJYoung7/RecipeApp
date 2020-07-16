function ancestorHTML() {
    const ancestor = document.createElement('div');
    ancestor.classList.add("tile", "is-ancestor");
    return ancestor;
}

function tileHTML(recipe, container) {
    const parent = document.createElement('div');
    parent.classList.add("tile", "is-parent");
    parent.innerHTML = `<div id="${recipe.title}" class="tile is-parent is-vertical box">
                        <div class="tile is-child">
                            <p class="title">${recipe.title}</p>
                        </div>
                        <div class="imgDiv">
                            <img src="${recipe.img}" alt="${recipe.title} img">
                        </div>
                        </div>
                        `;
    parent.querySelector('.is-parent').addEventListener('click', function() {
        console.log('Individual listener', this);
        const findRecipe = (element) => element.title === this.id;
        const recipe = defaultRecipes.findIndex(findRecipe);
        if (recipe >= 0) {
            console.log('do this');
            const recipeModal = makeRecipeModal(defaultRecipes[recipe]);
            // recipeModal.style.display = "block";

            container.appendChild(recipeModal);
        }
    });
    return parent;
}

function displayRecipeTiles(recipes, container) {
    for (let i = 0; i < recipes.length; i += 4) {
        let ancestor = ancestorHTML();
        for (let j = i; j < i + 4 && j < recipes.length; j++) {
            ancestor.appendChild(tileHTML(recipes[j], container));
        }
        container.appendChild(ancestor);
    }
}

function makeRecipeModal(recipe) {
    const recipeModal = document.createElement('div');
    recipeModal.classList.add('modal', 'is-active');
    recipeModal.id = "recipeModal";
    const prepartion = getRecipePreparartion(recipe);

    recipeModal.innerHTML = `
        <div class="modal-background">
        </div>
        <div class="modal-card">
            <header class="modal-card-head">
                <p class="modal-card-title">${recipe.title}</p>
            </header>
            <section class="modal-card-body">
                <div class="recipe-section">
                    <img id="modalImg" src="${recipe.img}">
                </div>
                <div class="recipe-info">
                    <h2 class="recipe-section-header">Info</h2>
                    <p>Meal Type: ${recipe.mealType}</p>
                    <p>Serving Size: ${recipe.servingSize}</p>
                    <p>Difficulty: ${recipe.difficulty}</p>
                </div>
                
                <div class="recipe-info" id="ingredients">
                    <h2 class="recipe-section-header">Ingredients</h2>
                    ${getRecipeIngredients(recipe).outerHTML}
                </div>
                <div class="recipe-info" id="preparation">
                    <h2 class="recipe-section-header">Preparation</h2>
                    ${prepartion.outerHTML}
                </div>
            </section>
            <button class="modal-close is-large" aria-label="close"></button>

         </div>
                
        `;

    return recipeModal;
}

function getRecipeIngredients(recipe) {
    let ingredients = document.createElement('div');
    for (let ingred of recipe.ingredients) {
        let item = document.createElement('p');
        item.innerText = `${ingred.item} - ${ingred.amount}`;
        ingredients.appendChild(item);
    }
    return ingredients;
}

function getRecipePreparartion(recipe) {
    let preparation = document.createElement('ol');
    for (let step of recipe.preparation) {
        let item = document.createElement('li');
        item.innerText = step;
        preparation.appendChild(item);
    }
    return preparation;
}
window.onclick = function(e) {
    console.log(e.target);

    if (e.target.matches('.modal-background') || e.target.matches('.modal-close')) {
        console.log("modal background");
        const recipeModal = document.getElementById('recipeModal');
        recipeModal.remove();
    }
}

const recipesContainer = document.getElementById('recipeTiles');
displayRecipeTiles(defaultRecipes, recipesContainer);