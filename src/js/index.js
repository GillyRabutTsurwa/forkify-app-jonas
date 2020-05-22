import Search from "./models/Search";

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
    const query = "chicken";

    // if there is a query create a new wearch object adn add it to the state
    if (query) {
        state.search = new Search(query);
        // Prepare UI for results
    
        // search for recipes
        search.getResults();

        // render results on UI
        await state.search.getResults();
        console.log(state.search);
    }


}

document.querySelector(".search").addEventListener("submit", (e) => {
    e.preventDefault();
    controlSearch();
});

const search = new Search("pizza");
console.log(search)

