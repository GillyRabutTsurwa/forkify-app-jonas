import uniqid from "uniqid";

export default class List {
    constructor() {
        this.items = [];
    }

    addItem(count, unit, ingredient) {
        const item = {
            id: uniqid(),
            count: count,
            unit: unit,
            ingredient: ingredient
        }
        this.items.push(item);
        return item; 
    }

    deleteItem(id) {
        const index = this.items.findIndex((currentItem) => {
            currentItem.id === id;
        });
        this.items.splice(index, 1);
    }

    updateCount(id, newCount) {
        let itemToUpdate = this.items.find((currentItem) => {
            return currentItem.id === id;
        });

        itemToUpdate.count = newCount;

    }
}
