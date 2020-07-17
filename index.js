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
        console.log(response);

        if (foundRecipesData) {
            const foundRecipesList = [];
            for (let recipe of foundRecipesData) {
                foundRecipesList.push(createRecipe(recipe));
            }
            recipesContainer.innerHTML = "";
            displayRecipeTiles(recipesContainer, foundRecipesList);

        } else {
            alert("No Recipes Found");
        }
    });
}

// Get recipes from local storage
const recipeList = JSON.parse(localStorage.getItem('recipeList'));

// Get the container where all the tiles will be appended
const recipesContainer = document.getElementById('recipeTiles');

// Create and append recipes to container
displayRecipeTiles(recipesContainer, recipeList);

// Add an event listener to the search button
const search = document.getElementById('searchButton').addEventListener('click', () => {
    const recipeToSearch = document.getElementById('searchInput');
    searchRecipes(recipeToSearch.value);
    recipeToSearch.value = "";
});