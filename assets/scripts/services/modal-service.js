// @ts-nocheck
import { getWorks, deleteWork } from "../api.js";

// Fonction pour gérer la suppression d'un travail
const handleDeleteWork = async (work, myFigure) => {
  try {
    const response = await deleteWork(work.id);
    switch (response.status) {
      case 200:
      case 204:
        console.log("Projet supprimé.");
        myFigure.remove();
        console.log(`work-item-${work.id}`);
        document.getElementById(`work-item-popup-${work.id}`).remove();
        console.log(`work-item-popup-${work.id}`);
        break;
      case 401:
        alert("Suppression impossible!");
        break;
      case 500:
      case 503:
        alert("Comportement inattendu!");
        break;
      default:
        alert("Erreur inconnue!");
        break;
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du travail:", error);
    alert("Erreur réseau!");
  }
};

// Fonction modifiée pour ouvrir la modal et afficher les travaux
const displayWorksInModal = (works) => {
  const modalContent = document.querySelector("#modal-works .modal-content");
  modalContent.innerHTML = "";
  works.forEach((work) => {
    let myFigure = document.createElement("figure");
    myFigure.setAttribute(
      "class",
      `work-item category-id-0 category-id-${work.categoryId}`
    );
    myFigure.setAttribute("id", `work-item-popup-${work.id}`);
    let myImg = document.createElement("img");
    myImg.setAttribute("src", work.imageUrl);
    myImg.setAttribute("alt", work.title);
    myFigure.appendChild(myImg);
    let trashIcon = document.createElement("i");
    trashIcon.classList.add("fa-solid", "fa-trash-can", "trash");
    myFigure.appendChild(trashIcon);
    trashIcon.addEventListener("click", async function (event) {
      event.preventDefault();
      handleDeleteWork(work, myFigure);
    });
    modalContent.appendChild(myFigure);
  });
  let modal = document.getElementById("modal");
  modal.classList.remove("hidden");
  modal.classList.add("show-flex");
  let modalWorks = document.getElementById("modal-works");
  modalWorks.classList.remove("hidden");
  modalWorks.classList.add("show-block");
};

export const displayModalOnClick = () => {
  document
    .getElementById("update-works")
    .addEventListener("click", async function (event) {
      event.preventDefault();
      try {
        const works = await getWorks();
        displayWorksInModal(works);
      } catch (error) {
        console.error("Erreur lors de la mise à jour des travaux:", error);
      }
    });
};

export const closeModalOnClick = () => {
  const modal = document.getElementById("modal");
  const modalWorks = document.getElementById("modal-works");

  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.classList.add("hidden");
      modal.classList.remove("show-flex");
      modalWorks.classList.add("hidden");
      modalWorks.classList.remove("show-block");
    }
  });
  modalWorks.addEventListener("click", function (event) {
    event.stopPropagation();
  });
};
