import Search from "./models/Search";
import * as searchView from "./views/searchView";
import { elementsObj } from "./views/base";

/** GLobal state of the application
 * Search object
 * Current recipe object
 * Shopping list object
 * Liked recipes
 */
const state = {};
console.log(state);
const controlSearch = async () => {
    //TODO: Get the query from the view
    const query = searchView.getInput();
    console.log(query);

    // if there is a query create a new wearch object adn add it to the state
    if (query) {
        state.search = new Search(query);
        // Prepare UI for results

        // render results on UI
        await state.search.getResults();
        // console.log(state);
        // console.log(state.search);
        console.log(state.search.results);
        searchView.clearInput();
        searchView.clearResults();
        searchView.renderResults(state.search.results);
        
    }


}

elementsObj.searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});

//TESTING:
elementsObj.heart.addEventListener("click", () => {
    console.clear();
})

