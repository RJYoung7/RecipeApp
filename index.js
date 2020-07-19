window.onclick = function(e) {
    if (e.target.matches('.modal-background') || e.target.matches('.modal-close')) {
        const recipeModal = document.getElementById('recipeModal');
        recipeModal.remove();
    }
}

function getIngredientsFromObj(testRecipe, newRecipe) {
    for (const item in testRecipe) {
        let ingredient = {
            item: "",
            amount: ""
        };
        if (item.match('strIngredient')) {
            if (testRecipe[item] !== "" && testRecipe[item] !== null) {
                let num = item.slice(13);
                ingredient.item = testRecipe[item];
                ingredient.amount = testRecipe[`strMeasure${num}`];
                newRecipe.ingredients.push(ingredient);
            }
        }
    }
}

function getPreparationFromObj({ strInstructions }, newRecipe) {
    const parts = strInstructions.split(/\r?\n/);
    for (let part of parts) {
        newRecipe.preparation.push(part);
    }
}

function recipeTemplate() {
    const recipeTemplate = {
        img: "",
        title: "",
        mealType: "",
        servingSize: 0,
        difficulty: "",
        ingredients: [],
        preparation: []
    };
    return recipeTemplate;
}

function createRecipe(testRecipe) {
    let newRecipe = recipeTemplate();
    newRecipe.img = testRecipe.strMealThumb;
    newRecipe.title = testRecipe.strMeal;
    newRecipe.mealType = testRecipe.strCategory;
    newRecipe.servingSize = (testRecipe.servingSize ? testRecipe.servingSize : 0);
    newRecipe.difficulty = (testRecipe.difficulty ? testRecipe.difficulty : "No Information");
    getIngredientsFromObj(testRecipe, newRecipe);
    getPreparationFromObj(testRecipe, newRecipe);
    return newRecipe;
}

const searchRecipes = (searchStr) => {
    let foundRecipesData;
    axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchStr}`).then(response => {
        foundRecipesData = response.data.meals;

        if (foundRecipesData) {
            const foundRecipesList = [];
            for (let recipe of foundRecipesData) {
                foundRecipesList.push(createRecipe(recipe));
            }
            recipesContainer.innerHTML = "";
            displayRecipeTiles(recipesContainer, true, foundRecipesList);

        } else {
            const navBar = document.querySelector('.navbar-start');
            const notFound = recipesNotFound();
            navBar.appendChild(notFound);
            window.setTimeout(() => {
                navBar.removeChild(notFound);
            }, 3500);
        }
    });
}

function recipesNotFound() {
    const navItem = document.createElement('a');
    navItem.classList.add('navbar-item', 'fade-out');
    navItem.innerText = "No Recipes Found";
    return navItem;
}

if (localStorage.getItem('recipeList') === null) {
    localStorage.setItem('recipeList', JSON.stringify(defaultRecipes));
}
// Get recipes from local storage
const recipeList = JSON.parse(localStorage.getItem('recipeList'));

// Get the container where all the tiles will be appended
const recipesContainer = document.getElementById('recipeTiles');

// Create and append recipes to container
displayRecipeTiles(recipesContainer, false, recipeList);

// Add an event listener to the search button
const search = document.getElementById('searchButton').addEventListener('click', () => {
    const recipeToSearch = document.getElementById('searchInput');
    searchRecipes(recipeToSearch.value);
    recipeToSearch.value = "";
});

//Event listener to detect a key press of enter
const enter = document.getElementById('searchInput').addEventListener("keyup", (e) => {
    if (e.keyCode === 13) {
        document.getElementById('searchButton').click();
    }
})

// Event listener for My Recipes anchor tag
const myRecipes = document.getElementById('myRecipes').addEventListener('click', () => {
    recipesContainer.innerHTML = "";
    const recipeList = JSON.parse(localStorage.getItem('recipeList'));

    displayRecipeTiles(recipesContainer, false, recipeList);
});