import Search from "./models/Search";
import Recipe from "./models/Recipe";
import List from "./models/List";
import Likes from "./models/Likes";
import * as searchView from "./views/searchView";
import * as recipeView from "./views/recipeView";
import * as listView from "./views/listView";
import * as likesView from "./views/likesView";
import { elements, renderLoader, clearLoader } from "./views/base";


const state = {};

// SEARCH CONTROLLER
const controlSearch = async () => {
    const query = searchView.getInput(); // 

    if (query) {
        state.search = new Search(query);
        
        searchView.clearInput();
        searchView.clearResults();


        try {
            await state.search.getResults();
            renderLoader(elements.searchResults);
            clearLoader();
            searchView.renderResults(state.search.result); 
        }
        catch (error) {
            alert("La recherche ne fonctionne pas");
            clearLoader();
        }
    }
}

elements.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});

elements.searchResultPages.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-inline"); 
    const goToPage = parseInt(btn.dataset.goto, 10); 
    if (btn) {
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
        
    }
});





const controlRecipe = async () => {
    const id = window.location.hash.replace("#", ""); 

    if (id) {
        recipeView.clearRecipe();
        renderLoader(elements.recipe);

        if (state.search) {
            searchView.highlightedSelected(id);
        }

        state.recipe = new Recipe(id);

        try {
            await state.recipe.getRecipe();
            state.recipe.parseIngredients(); 

            state.recipe.calculateTime();
            state.recipe.calculateServings();

            clearLoader();
            recipeView.renderRecipe(state.recipe, state.likes.isLiked(id));
        }
        catch (error) {
            alert("Une erreur s'est produite en processant la recette");
        }
    }
}


const controlList = () => {
    if (!state.list) state.list = new List();
    state.recipe.ingredients.forEach((currentElement) => {
        const item = state.list.addItem(currentElement.count, currentElement.unit, currentElement.ingredient)
        listView.renderItem(item);
    });
}



const controlLike = () => {
    if (!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;
    let argumentsAddLike = [state.recipe.title, state.recipe.authour, state.recipe.img]

    if (!state.likes.isLiked(currentID)) {
        const newLike = state.likes.addLike(currentID, ...argumentsAddLike);
        likesView.toggleLikeButton(true);
        likesView.renderLikedItem(newLike);
    }
    else {
        state.likes.deleteLike(currentID);
        likesView.toggleLikeButton(false);
        likesView.deleteLikedItem(currentID);
    }
    likesView.toggleLikeMenu(state.likes.getNumLikes());
}

window.addEventListener("load", () => {
    state.likes = new Likes();
    state.likes.readStorage();
    likesView.toggleLikeMenu(state.likes.getNumLikes());
    state.likes.likes.forEach((currentLike) => {
        likesView.renderLikedItem(currentLike);
    })
});

elements.shopping.addEventListener("click", (e) => {
    const id = e.target.closest(".shopping__item").dataset.itemid;

    if (e.target.matches(".shopping__delete, .shopping__delete *")) {
        state.list.deleteItem(id);
        listView.deleteItem(id);
    }
    else if (e.target.matches(".shopping__count--value")) {
        const valeur = parseFloat(e.target.value, 10);
        state.list.updateCount(id, valeur);
    }
});

elements.recipe.addEventListener("click", (e) => {
    if (e.target.matches(".btn-decrease, .btn-decrease *")) {
            if (state.recipe.servings > 1) {
                state.recipe.updateServingsAndIngredients("dec");
                recipeView.showUpdatedServingsAndingredients(state.recipe);
            }
    }
    else if (e.target.matches(".btn-increase, .btn-increase *")) {
        state.recipe.updateServingsAndIngredients("inc");
        recipeView.showUpdatedServingsAndingredients(state.recipe);
    }
    else if (e.target.matches(".recipe__btn--add, .recipe__btn--add *")) {
        controlList();
    }
    else if (e.target.matches(".recipe__love, .recipe__love *")) {
        controlLike();
    }
});

["hashchange", "load"].forEach((currentEvent) => {
    window.addEventListener(currentEvent, controlRecipe);
});
