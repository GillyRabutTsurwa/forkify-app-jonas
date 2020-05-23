import { elements } from "./base";
import { limitRecipeTitle } from "./searchView";

export const toggleLikeButton = (isLiked) => {
    const iconString = isLiked ? "icon-heart" : "icon-heart-outlined";
    document.querySelector(".recipe__love use").setAttribute("href", `img/icons.svg#${iconString}`);
}

export const toggleLikeMenu = (numOfLikes) => {
    elements.likesMenu.style.visibility = numOfLikes > 0 ? "visible" : "hidden";
}

export const renderLikedItem = (likedItem) => {
    const markup = `
    <li>
        <a class="likes__link" href="#${likedItem.id}">
            <figure class="likes__fig">
                <img src="${likedItem.img}" alt="${likedItem.title}">
            </figure>
            <div class="likes__data">
                <h4 class="likes__name">${limitRecipeTitle(likedItem.title)}</h4>
                <p class="likes__author">${likedItem.authour}</p>
            </div>
        </a>
    </li>
    `;
    elements.likesList.insertAdjacentHTML("beforeend", markup);
}

export const deleteLikedItem = (id) => {
    const likeToDelete = document.querySelector(`.likes__link[href="#${id}"]`);
    if (likeToDelete.parentElement) likeToDelete.parentElement.removeChild(likeToDelete);
}