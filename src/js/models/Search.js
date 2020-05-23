import axios from "axios";
export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        try {
            const response = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${this.query}`);
            this.results = response.data.recipes;
            console.log(this.results);
        }
        catch(err) {
            console.log(`${err} ma pinchi`)
        }
    }
}