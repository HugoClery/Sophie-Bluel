// @ts-nocheck

import { getWorks, getCategories } from "../api.js";

export const listAllWorks = (works) => {
  const gallery = document.querySelector("div.gallery");
  gallery.innerHTML = ""; // Vider le conteneur avant d'ajouter de nouveaux éléments

  works.forEach((work) => {
    let myFigure = document.createElement(`figure`);
    myFigure.setAttribute(
      "class",
      `work-item category-id-0 category-id-${work.categoryId}`
    );
    myFigure.setAttribute("id", `work-item-${work.id}`);
    const myImg = document.createElement("img");
    myImg.setAttribute("src", work.imageUrl);
    myImg.setAttribute("alt", work.title);
    myFigure.appendChild(myImg);
    const myFigcaption = document.createElement("figcaption");
    myFigcaption.textContent = work.title;
    myFigure.appendChild(myFigcaption);
    gallery.appendChild(myFigure);
  });
};

const listAllCategories = (categories) => {
  categories.unshift({ id: 0, name: "Tous" });
  categories.forEach((category) => {
    let myButton = document.createElement("button");
    myButton.classList.add("work-filter", "filters-design");
    if (category.id === 0)
      myButton.classList.add("filter-active", "filter-all");
    myButton.setAttribute("data-filter", category.id);
    myButton.textContent = category.name;
    document.querySelector("div.filters").appendChild(myButton);
    myButton.addEventListener("click", function (event) {
      document.querySelectorAll(".work-filter").forEach((workFilter) => {
        workFilter.classList.remove("filter-active");
      });
      event.target.classList.add("filter-active");
      let categoryId = myButton.getAttribute("data-filter");
      document.querySelectorAll(".work-item").forEach((workItem) => {
        workItem.classList.add("hidden");
      });
      document
        .querySelectorAll(`.work-item.category-id-${categoryId}`)
        .forEach((workItem) => {
          workItem.classList.remove("hidden");
        });
    });
  });
};

export const init = async () => {
  const works = await getWorks();
  listAllWorks(works);
  const categories = await getCategories();
  listAllCategories(categories);
};
