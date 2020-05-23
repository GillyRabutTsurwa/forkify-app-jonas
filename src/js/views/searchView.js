import { elements } from "./base";

export const getInput = () => elements.searchInput.value;

export const clearInput = () => { 
    elements.searchInput.value = "";
}

export const clearResults = () => {
    elements.searchResultList.innerHTML = "";
    elements.searchResultPages.innerHTML = "";
}

export const highlightedSelected = (id) => {
    let resultsArr = Array.from(document.querySelectorAll(".results__link"));
    resultsArr.forEach((currentResult) => {
        currentResult.classList.remove("results__link--active");
    })
    document.querySelector(`.results__link[href="#${id}"]`).classList.add("results__link--active");
}

export const limitRecipeTitle = (recipeTitle, limit = 17) => {
    const newTitle = [];
    if (recipeTitle.length > limit) {
        recipeTitle.split(" ").reduce((accumulator, currentValue) => {
            if (accumulator + currentValue.length <= limit) {
                newTitle.push(currentValue);
            }
            return accumulator + currentValue.length;
        }, 0);
        return `${newTitle.join(" ")} ...`;
    }
    return recipeTitle;
}

const renderRecipe = (currentRecipe) => {
	const markup = `
    <li>
        <a class="results__link" href="#${currentRecipe.recipe_id}">
            <figure class="results__fig">
                <img src="${currentRecipe.image_url}" alt="${currentRecipe.title}">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${limitRecipeTitle(currentRecipe.title)}</h4>
                <p class="results__author">${currentRecipe.publisher}</p>
            </div>
        </a>
    </li>`;
	elements.searchResultList.insertAdjacentHTML("beforeend", markup); 
};

const createButton = (pageNumber, pageType) => {
    return `
    <button class="btn-inline results__btn--${pageType}" data-goto=${pageType === "previous" ? pageNumber - 1 : pageNumber + 1}>
        <span>Page ${pageType === "previous" ? pageNumber - 1 : pageNumber + 1}</span>
        <svg class="search__icon">
            <use href="img/icons.svg#icon-triangle-${pageType === "previous" ? "left" : "right"}"></use>
        </svg>
    </button>
    `;
}

const renderButtons = (page, numOfResults, resultsPerPage) => {
    const pages = Math.ceil(numOfResults / resultsPerPage); 
    let button;
    if (page === 1 && pages > 1) {
        button = createButton(page, "next");
    }
    else if (page < pages) {
        button = `${createButton(page, "previous")} ${createButton(page, "next")}`;
    }
    else if (page === pages && pages > 1) {
        button = createButton(page, "previous");
    }
    elements.searchResultPages.insertAdjacentHTML("afterbegin", button);
}

export const renderResults = (recipes, page = 1, resultsPerPage = 10) => {
    const start = (page - 1) * resultsPerPage;
    const end = page * resultsPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    
    renderButtons(page, recipes.length, resultsPerPage);
};