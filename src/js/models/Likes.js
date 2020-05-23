export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, authour, img) {
        const likeObj = {
            id: id, 
            title: title, 
            authour: authour, 
            img: img
        }
        this.likes.push(likeObj);
        this.persistData();
        return likeObj;
    }

    deleteLike(id) {
        const index = this.likes.findIndex((currentElement) => {
            return currentElement.id === id;
        });
        this.likes.splice(index, 1);
        this.persistData();
    }

    isLiked(id) {
        const index = this.likes.findIndex((currentElement) => {
            return currentElement.id === id;
        });
        return index !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
    persistData() {
        localStorage.setItem("likes", JSON.stringify(this.likes));
    }
    readStorage() {
        const storage = JSON.parse(localStorage.getItem("likes"));
        if (storage) this.likes = storage;
    }
}

