import axios from "axios";

export default class Recipe {
	constructor(id) {
		this.id = id;
	}

	async getRecipe() {
		try {
			const result = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
			this.title = result.data.recipe.title;
			this.authour = result.data.recipe.publisher;
			this.img = result.data.recipe.image_url;
			this.url = result.data.recipe.source_url;
			this.ingredients = result.data.recipe.ingredients;
		} catch (error) {
			console.log(error);
			alert("Aïe, Une erreur s'est produite");
		}
	}

	calculateTime() {
		const numOfIngredients = this.ingredients.length;
		const periods = Math.ceil(numOfIngredients / 3);
		this.time = periods * 15;
	}

	calculateServings() {
		this.servings = 4;
	}

	parseIngredients() {
		const unitsLong = [ "tablespoons", "tablespoon", "ounces", "ounce", "teaspoons", "teaspoon", "cups", "pounds" ];
		const unitsShort = [ "tbsp", "tbsp", "oz", "oz", "tsp", "tsp", "cup", "pound" ];
		const units = [...unitsShort, "kg", "g"]; 

		const newIngredients = this.ingredients.map((currentIngredient) => {
			let ingredient = currentIngredient.toLowerCase();
			unitsLong.forEach((currentUnit, index) => {
				ingredient = ingredient.replace(currentUnit, unitsShort[index]);
			});

			ingredient = ingredient.replace(/ *\([^)]*\) */g, " ");

            const arrayIngredient = ingredient.split(" ");
            const unitIndex = arrayIngredient.findIndex(currentIngredient2 => units.includes(currentIngredient2));
            let objectIngredient;

            if (unitIndex > -1) {
                const arrayCount = arrayIngredient.slice(0, unitIndex); 
				let count;
				
                if (arrayCount.length === 1) {
                    count = eval(arrayIngredient[0].replace("-", "+"));
                } 
                else {
                    count = eval(arrayIngredient.slice(0, unitIndex).join("+"));
                }

                objectIngredient = {
                    count: count,
                    unit: arrayIngredient[unitIndex],
                    ingredient: arrayIngredient.slice([unitIndex + 1].join(" "))
                };
            }
            else if (parseInt(arrayIngredient[0], 10)) {
                objectIngredient = {
                    count: parseInt(arrayIngredient[0], 10),
                    unit: "",
                    ingredient: arrayIngredient.slice(1).join(" ")
                };
            }
            else if (unitIndex === -1) { 
                objectIngredient = {
                    count: 1,
                    unit: "",
                    ingredient: ingredient
                };
            }

			return objectIngredient;
		});
		this.ingredients = newIngredients;
	}

	updateServingsAndIngredients(type) {
		const newServings = type === "dec" ? this.servings - 1 : this.servings + 1;

		this.ingredients.forEach((currentIngredient) => {
			currentIngredient.count *= (newServings / this.servings);
		});

		this.servings = newServings;
	}
}
