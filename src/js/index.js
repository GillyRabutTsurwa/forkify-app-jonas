import axios from "axios";

// NOTE: Refresher on using promises can be found here. Just open this block to look at the code
{
    // async function getResults(query) {
    //     try {
    //         const response = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
    //         const infoObj = {
    //             apiInfo: response,
    //             apiData: response.data,
    //             apiRecipes: response.data.recipes
    //         }
    //         console.log(infoObj);
    //     }
    //     catch(err) {
    //         console.log(`Error: ${err}`);
    //     }
    // }
    

    // function getResults2(query) {
    //     const response = axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
    //     response.then((info) => {
    //         const infoObj = {
    //             apiInfo: info,
    //             apiData: info.data,
    //             apiRecipes: info.data.recipes
    //         }
    //         console.log(infoObj);
    //     }).catch((err) => {
    //         console.log("There was an error in the pinchi");
    //     });
    // }
    
    // getResults("pizza");
    // getResults2("pizza");
}

async function getResults(query) {
    try {
        const response = await axios(`https://forkify-api.herokuapp.com/api/search?&q=${query}`);
        const infoObj = {
            apiInfo: response,
            apiData: response.data,
            apiRecipes: response.data.recipes
        }
        console.log(infoObj);
    }
    catch(err) {
        console.log(`${err} ma pinchi`)
    }
    
}

getResults("pizza");