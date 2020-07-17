function displayRecipeTiles(container, searchBool, recipeList = defaultRecipes) {
    for (let i = 0; i < recipeList.length; i += 4) {
        let ancestor = ancestorHTML();
        for (let j = i; j < i + 4 && j < recipeList.length; j++) {
            ancestor.appendChild(tileHTML(recipeList, recipeList[j], container, searchBool));
        }
        container.appendChild(ancestor);
    }
}

function ancestorHTML() {
    const ancestor = document.createElement('div');
    ancestor.classList.add("tile", "is-ancestor");
    return ancestor;
}

function tileHTML(recipeList, recipe, container, searchBool) {
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
        const findRecipe = (element) => element.title === this.id;
        const recipe = recipeList.findIndex(findRecipe);
        if (recipe >= 0) {
            const recipeModal = makeRecipeModal(recipeList[recipe], searchBool);
            if (searchBool) {
                const saveBtn = recipeModal.querySelector("#saveBtn");
                saveBtn.addEventListener('click', () => {
                    const storedRecipes = JSON.parse(localStorage.getItem('recipeList'));
                    storedRecipes.push(recipeList[recipe]);
                    localStorage.setItem('recipeList', JSON.stringify(storedRecipes));
                    saveBtn.remove();
                    const footer = document.querySelector('footer');
                    const p = document.createElement('p');
                    p.innerText = "Saved!";
                    footer.appendChild(p);
                });
            } else {
                const deleteBtn = recipeModal.querySelector("#deleteBtn");

                deleteBtn.addEventListener('click', () => {
                    recipeList.splice(recipe, 1);
                    console.log(recipeList);
                    container.innerHTML = "";
                    recipeModal.remove();
                    localStorage.setItem('recipeList', JSON.stringify(recipeList));
                    displayRecipeTiles(recipesContainer, false, recipeList);
                });
            }

            container.appendChild(recipeModal);
        }
    });
    return parent;
}

function ingredientsHTML(recipe) {
    let ingredients = document.createElement('div');
    for (let ingred of recipe.ingredients) {
        let item = document.createElement('p');
        item.innerText = `${ingred.item} - ${ingred.amount}`;
        ingredients.appendChild(item);
    }
    return ingredients;
}

function preparartionHTML(recipe) {
    let preparation = document.createElement('ol');
    for (let step of recipe.preparation) {
        let item = document.createElement('li');
        item.innerText = step;
        preparation.appendChild(item);
    }
    return preparation;
}

function saveOrDeleteHTML(searchBool) {
    console.log(searchBool);
    const footer = document.createElement('footer');
    footer.classList.add('modal-card-foot');
    if (searchBool) {
        footer.innerHTML = `<button id="saveBtn" class="button is-success">Save Recipe</button>`;
    } else {
        footer.innerHTML = `<button id="deleteBtn" class="button is-danger">Delete Recipe</button>`;
    }
    console.log('footer complete');
    return footer;
}

function makeRecipeModal(recipe, searchBool) {
    const recipeModal = document.createElement('div');
    recipeModal.classList.add('modal', 'is-active');
    recipeModal.id = 'recipeModal';

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
                    ${ingredientsHTML(recipe).outerHTML}
                </div>
                <div class="recipe-info" id="preparation">
                    <h2 class="recipe-section-header">Preparation</h2>
                    ${preparartionHTML(recipe).outerHTML}
                </div>
            </section>
            ${saveOrDeleteHTML(searchBool).outerHTML}
            <button class="modal-close is-large" aria-label="close"></button>
         </div>       
        `;

    return recipeModal;
}