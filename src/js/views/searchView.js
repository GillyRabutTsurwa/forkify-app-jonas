import { elementsObj } from "./base";

export const getInput = () => elementsObj.searchInput.value;
export const clearInput = () => {
    elementsObj.searchInput.value = "";
};

export const clearResults = () => {
    elementsObj.searchResultsList.innerHTML = "";
}

const renderRecipes = (currentRecipe) => {
    const markup = `
    <li>
        <a class="results__link" href="#${currentRecipe.recipe_id}">
            <figure class="results__fig">
                <img src="${currentRecipe.image_url}" alt="${currentRecipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${currentRecipe.title}</h4>
                <p class="results__author">${currentRecipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
    elementsObj.searchResultsList.insertAdjacentHTML("beforeend", markup);
    // console.log(currentRecipe.title);
}

export const renderResults = (recipesArr) => {
    recipesArr.forEach(renderRecipes);
}